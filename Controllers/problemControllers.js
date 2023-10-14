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

    res.json(updatedProblem);
  } catch (error) {
    res.json({ error: `Post with ${problemId} does not exixts` })
  }
};

exports.createProblem = async (req, res, next) => {
  try {
    const { title, description, status, expert, creatorId } = req.body;

    // Validation can be added here

    const result = await prisma.problem.create({
      data: {
        title,
        description,
        status,
        expert,
        creator: { connect: { id: creatorId } },
      },
    });

    res.json(result);
  } catch (error) {
    next(error);
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
    next(error);
  }
};

exports.getProblem = async (req, res, next) => {
  try {
    const result = await prisma.problem.findMany()
    res.json(result)
  } catch (error) {
    res.json({ error: `No post was found` })
  }
};
