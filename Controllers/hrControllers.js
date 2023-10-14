const { PrismaClient } = require('@prisma/client');
const sendEmail = require('../utils/sendEmail');
const prisma = new PrismaClient();

exports.takeInterview = async (req, res, next) => {
    const { expartEmail, zoomlink } = req.body;
    try {
        await sendEmail(expartEmail, "Take Interview", zoomlink);
        const updatedgetInterView = await prisma.expert.update({
            where: { email: expartEmail },
            data: {
                getInterView: true,
            },
        });
        res.send({ acknowledged: true, message:"Send an email for interview schedule" })
    } catch (error) {
        return res.status(500).json({ error: error.name });
    }
};

exports.hireExpart = async (req, res, next) => {
    const { expartEmail } = req.body;

    try {
        await sendEmail(expartEmail, "Get hired", "Congratulations! I am pleased to confirm your successful selection for the [Position] role at [Your Company]. We look forward to your contributions starting on [Start Date].");

        const updatehired = await prisma.expert.update({
            where: { email: expartEmail },
            data: {
                hired: true,
            },
        });

        res.send({ acknowledged: true, message:"Successfully send Congratulations email" })
    } catch (error) {
        res.status(500).json({ error: error.name });
    }
}