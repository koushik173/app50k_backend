const { PrismaClient } = require('@prisma/client');
const sendEmail = require('../utils/sendEmail');
const prisma = new PrismaClient();

exports.takeInterview = async (req, res, next) => {
    const { expartEmail, zoomlink, expartid } = req.body;
    try {
        await sendEmail(expartEmail, "Take Interview", zoomlink);
        const updatedgetInterView = await prisma.expert.update({
            where: { id: expartid },
            data: {
                getInterView: true,
            },
        });
        res.json(updatedgetInterView);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.hireExpart = async (req, res, next) => {
    const { expartEmail, exEmail, exPass, expartid } = req.body;
    try {
        await sendEmail(expartEmail, "Get hired", JSON.stringify({ "email": exEmail, "password": exPass }));

        const updatehired = await prisma.expert.update({
            where: { id: expartid },
            data: {
                hired: true,
            },
        });
        res.json(updatehired);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}