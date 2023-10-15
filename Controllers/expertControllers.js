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

exports.allExpertSearch = async (req, res, next) => {
  const { type } = req.body;

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

    const combinedExperts = experts.concat(relatedExperts);

    // Remove duplicate experts based on id
    const uniqueExperts = combinedExperts.filter(
      (expert, index, self) => index === self.findIndex((t) => t.id === expert.id)
    );

    res.json(uniqueExperts);
  } catch (error) {
    return res.status(500).json({ acknowledged: false, error: error.name });
  }
};



exports.findPendingWorkForExpert = async (req, res, next) => {
  try {
    const { expertId } = req.params;


    const pendingWork = await prisma.problem.findMany({
      where: {
        expert: expertId
      },
    })

    console.log(pendingWork);

    res.json({ acknowledged: true, pendingWork });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ acknowledged: false, error: `Error finding pending work: ${error.message}` });
  }
};

