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

// Updated route using path parameter
exports.allExpertSearch = async (req, res, next) => {
  const { type } = req.params;

  try {
    if (!type) {
      return res.status(400).json({ error: 'Expert type parameter is required.' });
    }

    const experts = await prisma.expert.findMany({
      where: {
        type: {
          contains: type,
        },
      },
    });

    // Additional logic to include related terms
    const relatedExperts = await prisma.expert.findMany({
      where: {
        type: {
          contains: type,
        },
        OR: [
          { type: { contains: 'Engineer' } }, // Include related term "Engineer"
          // Add more related terms as needed
        ],
      },
    });

    const combinedExperts = [...new Set([...experts, ...relatedExperts])];

    res.json(combinedExperts);
  } catch (error) {
    return res.status(500).json({ acknowledged: false, error: error.name });
  }
};

