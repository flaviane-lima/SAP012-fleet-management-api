//  está importando o módulo fs (file sytem) do Node.js
const fs = require("fs");
// está importando PrismaClient e Prisma do pacote @prisma/client
const { PrismaClient, Prisma} = require("@prisma/client");
// é criado uma nova instância do PrismaCliente para interagir com o banco de dados
const prisma = new PrismaClient();
// está sendo criado uma função assincrona para carregar os dados do arqivo SQL.
async function carregarDados(path) {
  try {
    // Lê o conteúdo do diretório especificado por 'path'
    fs.readdir(path, async (err, files) => { 
      // se ocorrer um erro no diretório ele vai imprimir um erro
       if (err) console.log(err);
       else { 
           // Itera sobre cada arquivo no diretório
           for (const file of files) {
            // Lê o conteúdo do arquivo atual de forma assíncrona
             const data = await fs.promises.readFile(`${path}/${file}`, "utf8");
             // Divide o conteúdo do arquivo em várias consultas SQL, separadas por ponto e vírgula
             const sqls = data.split(";").filter(Boolean);
             // Imprime as consultas SQL lidas do arquivo
             console.log("Consultas SQL:", sqls);
             // Executa todas as consultas SQL em uma transação
            await prisma.$transaction(sqls.map(sql =>prisma.$queryRaw`${Prisma.raw(sql)}`));

             // Imprime uma mensagem indicando que os dados do arquivo foram carregados com sucesso
            console.log(`Dados do arquivo ${file} carregados com sucesso`);
           }
           // Imprime uma mensagem indicando que todos os arquivos foram processados
            console.log("Concluído");
       }
    });
  } catch (error) {
    // Se ocorrer um erro durante o processamento, imprime o erro
    console.error("Erro ao carregar dados:", error);
  } finally {
    // Desconecta o cliente Prisma do banco de dados
    await prisma.$disconnect();
  }
}
// Chama a função carregarDados para carregar os dados do diretório especificado
carregarDados('./prisma/data/taxis')
.then(() => {
  // Imprime uma mensagem indicando que os dados de táxis foram carregados com sucesso
  console.log("Dados de táxis carregados com sucesso");
  return carregarDados('./prisma/data/trajectories');
})
.then(() => {
 // Imprime uma mensagem indicando que os dados de trajetórias foram carregados com sucesso
  console.log("Dados do trajectories do táxi carregado com sucesso");
})
.catch(async (e) => {
  // Se ocorrer um erro durante qualquer etapa, imprime o erro
  console.error("Error a carregar dados:", e);
  // Desconecta o cliente Prisma do banco de dados
  await prisma.$disconnect();
   // Encerra o processo com código de erro 1
  process.exit(1);
});