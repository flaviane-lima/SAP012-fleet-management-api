const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



exports.getTaxis = async (page) => prisma.taxis.findMany({ 
  skip: (page - 1) * 10,
  take: 10
});

exports.getTaxisIdTrajectorie = async (id, date, page) => prisma.trajectories.findMany({
  where: {
    id: Number(id),
  
  date: {
    gte: new Date(date),
    lt: new Date(date)
  }
},
  skip: (page - 1) * 10,
  take: 10
});