const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.applyExpart = async (req, res, next) => {
  try {
    const { projects, expartise, email } = req.body;
    // Validation can be added here
    const result = await prisma.expert.create({
      data: {
        email,
        expartise,
        projects,
        getInterView: false,
        hired: false,
      }
    });

    res.send({ acknowledged: true, message:"Successfully Applied" })

  } catch (error) {
    return res.send({ acknowledged: false, error: error.name })
  }
}

exports.allExpart = async (req, res, next) => {
  try {
    const result = await prisma.expert.findMany()
    res.json(result)
  } catch (error) {
    res.json({ error: `No post was found` })
  }
}