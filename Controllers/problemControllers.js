// Assuming you have already initialized and imported PrismaClient
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.updateProblem = async (req, res, next) => {
  try {
    const { problemId } = req.params;
    const { title, description } = req.body;

    const updatedProblem = await prisma.problem.update({
      where: { id: problemId },
      data: {
        title,
        description
      },
    });

    res.send({ acknowledged: true, message:"Successfully updated" })
  } catch (error) {
    res.json({ error: `Post with ${problemId} does not exixts` })
  }
};

exports.createProblem = async (req, res, next) => {
  try {
    const { title, description, creatorId } = req.body;
    const result = await prisma.problem.create({
      data: {
        title,
        description,
        status: null,
        expert: null,
        creator: { connect: { id: creatorId } },
      },
    });

    res.send({ acknowledged: true, message:`Successfully ${title} problem created` })
  } catch (error) {
    // return res.send({ acknowledged: false, error: error.name });
    return res.json({ error: `Post with ${creatorId} does not exixts` })
  }
};


exports.deleteProblem = async (req, res, next) => {
  try {
    const { problemId } = req.params;

    const deletedProblem = await prisma.problem.delete({
      where: { id: problemId },
    });

    res.json(deletedProblem);
  } catch (error) {
    return res.json({ error: `Post with ${problemId} does not exixts` })
  }
};

exports.getProblem = async (req, res, next) => {
  const {creatorId} = req.params;
  try {
    const result = await prisma.problem.findMany({
      where: {
        creatorId: creatorId, 
      },
    });
    if (result.length === 0) {
      return res.json({ error: `No problems found for the user with ID ${userId}` });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.selectExpert= async (req, res, next)=>{
  try {
    const { expertid, problemId } = req.body;
    const updatedProblem = await prisma.problem.update({
      where: { id: problemId },
      data: {
        expert: expertid
      },
    });
    res.send({ acknowledged: true, message:"Successfully updated" })
  } catch (error) {
    res.json({ error: `Post with ${problemId} does not exixts` })
  }

}


// exports.getProblem = async (req, res, next) => {
//   try {
//     const result = await prisma.problem.findMany()
//     res.json(result)
//   } catch (error) {
//     return res.json({ error: `No post was found` })
//   }
// };
