const prisma = require("../prisma/index");
const cookieToken = require("../utils/cookieToken");

exports.signup = async (req, res, next) => {
    try {
        const { name, email, username, password } = req.body
        if (!name || !email || !password || !username) {
            const message = "Please provide all fields";
            return res.send({ acknowledged: false, message });
        }
        const alreadyCreated = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (alreadyCreated) {
            const message = "Already Have an account with this email"
            return res.send({ acknowledged: false, message })
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                username,
                password,
                verify: false
            }
        })
        // res.send(user);

        cookieToken(user, res)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            const message = "Please provide all fields"
            return res.send({ acknowledged: false, message })
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            const message = "User Not Found"
            return res.send({ acknowledged: false, message })
        }
        else if (user.password != password) {
            const message = "Password Not Matched"
            return res.send({ acknowledged: false, message })
        }
        else if(!user.verify){
            const message = "Please Verify Your Email"
            return res.send({ acknowledged: false, message })
        }
        else{
            cookieToken(user, res)
        }    
    } catch (error) {
        throw new Error(error)
    }
}

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('token')
        res.json({
            success: true
        })
    } catch (error) {
        throw new Error(error)
    }
}

exports.alluser = async (req, res, next) => {
    try {
        const result = await prisma.user.findMany();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.userVerify = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.params.id } });
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await prisma.userToken.findUnique({ where: { token: req.params.token } });
        if (!token) return res.status(400).send({ message: "Invalid link" });

        await prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                verify: true
            },
        });
        await prisma.userToken.update({ 
            where: { 
                token: req.params.token 
            },
            data:{
                token: 'time out'
            }
         });
        res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
}