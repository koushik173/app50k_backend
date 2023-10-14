const { PrismaClient } = require('@prisma/client');
const sendEmail = require('../utils/sendEmail');
const prisma = new PrismaClient();

exports.takeInterview = async (req, res, next) => {
    const { expertEmail, zoomlink } = req.body;
    try {
        await sendEmail(expertEmail, "Take Interview", zoomlink);
        const updatedgetInterView = await prisma.expert.update({
            where: { email: expertEmail },
            data: {
                getInterView: true,
            },
        });
        res.send({ acknowledged: true, message:"Send an email for interview schedule" })
    } catch (error) {
        return res.status(500).json({ error: error.name });
    }
};

exports.hireExpert = async (req, res, next) => {
    const { expertEmail } = req.body;

    try {
        await sendEmail(expertEmail, "Get hired", "Congratulations! I am pleased to confirm your successful selection for the [Position] role at [Your Company]. We look forward to your contributions starting on [Start Date].");

        await prisma.expert.update({
            where: { email: expertEmail },
            data: {
                hired: true,
            },
        });
        await prisma.user.update({
            where: { email: expertEmail },
            data: {
                role: "expert",
            },
        });

        res.send({ acknowledged: true, message:"Successfully send Congratulations email" })
    } catch (error) {
        res.status(500).json({ error: error.name });
    }
}