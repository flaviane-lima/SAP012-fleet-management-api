const { PrismaClient } = require('@prisma/client');
// const { trace } = require('../routes/taxi');
const prisma = new PrismaClient();



exports.getTaxis = async (page) => prisma.taxis.findMany({ 
  skip: (page - 1) * 10,
  take: 10
});

exports.getTaxisIdTrajectorie = async (id, date, page) => prisma.trajectories.findMany({
  where: {
  
  date: {
    gte: new Date(date),
    lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
  
  },
  
  taxi_id: id,
},
  skip: (page - 1) * 10,
  take: 10
});

exports.getTaxisLocalizacao = async (page) => prisma.taxis.findMany({ 


    include: {
      trajectories: {
        orderBy: {
          date: 'asc'
          
        },
        skip: 0,
        take:1
      }

    },
    

  skip: (page - 1) * 10,
  take: 10
});