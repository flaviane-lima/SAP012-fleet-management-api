const fs = require("fs");
const { PrismaClient, Prisma} = require("@prisma/client");
const prisma = new PrismaClient();
async function carregarDados(path) {
  try {
    fs.readdir(path, async (err, files) => { 
       if (err) console.log(err);
       else { 
           for (const file of files) {
      const data = await fs.promises.readFile(`${path}/${file}`, "utf8");
      const sqls = data.split(";").filter(Boolean);
      console.log("Consultas SQL:", sqls);
      await prisma.$transaction(sqls.map(sql =>prisma.$queryRaw`${Prisma.raw(sql)}`));


      console.log(`Dados do arquivo ${file} carregados com sucesso`);
    }
    console.log("Concluído");
       }
    });
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}
carregarDados('./prisma/data/taxis')
.then(() => {
  console.log("Dados de táxis carregados com sucesso");
  return carregarDados('./prisma/data/trajectrories');
})
.then(() => {
  console.log("Dados do trajectories do táxi carregado com sucesso");
})
.catch(async (e) => {
  console.error("Error a carregar dados:", e);
  await prisma.$disconnect();
  process.exit(1);
});