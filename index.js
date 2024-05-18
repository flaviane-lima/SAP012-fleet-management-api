const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const  taxiRouter = require('./routes/taxi');

const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || 'http://localhost';
const app = express();
const prisma = new PrismaClient; // inicialização do prisma/client

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Bem-vindo!');
});

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use('/', taxiRouter);

app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

const server = app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
});


// vai garantir que o prisma/client seja desconectado corretamente  e aplicação seja encerrada adequadamente.
process.on('SIGINT', async () => {
    console.log('SIGINT recebido');
    console.info('\nEncerrando o servidor...');
    await prisma.$disconnect();
    // esse serve é chamado para encerrar o servidor.
    server.close(() => {
        console.info('Servidor encerrado');
        process.exit();
    });
});