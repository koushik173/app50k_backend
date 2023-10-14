const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.applyExpert = async (req, res, next) => {
  try {
    const { type, projects, expertise, email, network_skills, certifications } = req.body;
    // Validation can be added here
    const result = await prisma.expert.create({
      data: {
        email,
        type,
        expertise,
        projects,
        network_skills,
        certifications,
        getInterView: false,
        hired: false,
      }
    });
    res.send({ acknowledged: true, message: "Successfully Applied" })

  } catch (error) {
    return res.send({ acknowledged: false, error: error.name })
  }
}

exports.allExpert = async (req, res, next) => {
  try {
    const result = await prisma.expert.findMany()
    res.json(result)
  } catch (error) {
    res.json({ error: `No post was found` })
  }
}

exports.allExpertTypes = async (req, res, next) => {
  try {
    const experts = await prisma.expert.findMany();
    const uniqueExpertTypes = [...new Set(experts.map(expert => expert.type))];
    res.json(uniqueExpertTypes);
  } catch (error) {
    return res.send({ acknowledged: false, error: error.name })
  }
};
