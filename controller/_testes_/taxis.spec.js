
const taxiServices  = require('../../services/taxiServices');


const {
  getTaxis
} = require('../taxi');

// está fazendo o mock das funções do services, substituindo as funções do services pelo dos mocks
jest.mock('../../services/taxiServices', () => ({
  getTaxis: jest.fn()
}))

//criando um objeto vazio 
const req = {
  query: { page: '1' } // Simula a query string com a propriedade 'page' definida
};
const res =  {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

// antes de cada teste limpa todos os mocks
beforeEach(() => {
  jest.clearAllMocks();
});

// definindo um bloco de teste para a função
describe('getTaxis', () => {
  it('deve obter a coleção de táxis', async () => {
    const mockTaxis = [
      {
        id: 15,
        plate: "FNHK-3772"
      }
    ];
    // definindo o retorno do mock
    taxiServices.getTaxis.mockResolvedValue(mockTaxis);

    // chama a função com objetos simulados
    await getTaxis(req,res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith(mockTaxis);

  });
  it('deve retornar um erro 500 e uma menssagem quando ocorrer um erro', async () => {
    const errorMessage = 'erro ao buscar os táxis';

    // definindo um retorno do mock
    taxiServices.getTaxis.mockRejectedValue(new Error(errorMessage));

    await getTaxis(req,res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  })
})