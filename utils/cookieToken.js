const getJwtToken = require('../helpers/getJwtToken');
const sendEmail = require('./sendEmail');
const prisma = require('../prisma/index')

const cookieToken = async (user, res) => {
    const token = getJwtToken(user.id);
    const options = {
        expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    user.password = undefined;

    if (user.verify) {
        return res.status(200).cookie('token', token, options).json({
            success: true,
            token,
            user
        })
    }

    try {
        if (token) {
            const result = await prisma.userToken.create({
                data: {
                    token: token,
                    type: 'authentication',
                    userId: user.id
                }
            });

            // console.log("create Token: ",result);

            const url = `${process.env.BASE_URL}/${user.id}/verify/${result.token}`;
            await sendEmail(user.email, "Verify Email", url);
            res.status(201).send({ message: "An Email sent to your account please verify" });

        } else {
            throw new Error('Internal Server Token Error');
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }

}
module.exports = cookieToken;