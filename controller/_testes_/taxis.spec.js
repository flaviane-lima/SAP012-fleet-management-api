
const taxiServices  = require('../../services/taxiServices');


const {
  getTaxis,
  getTaxisIdTrajectorie,
  getTaxisLocalizacao
} = require('../taxi');

// está fazendo o mock das funções do services, substituindo as funções do services pelo dos mocks
jest.mock('../../services/taxiServices', () => ({
  getTaxis: jest.fn(),
  getTaxisIdTrajectorie: jest.fn(),
  getTaxisLocalizacao: jest.fn()
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
  });
});

describe('getTaxisIdTrajectorie', () =>{
  it('deve obter a trajetória dos taxis pelo id', async () => {
    const req = {
      params: { id: '1'},
      query: {
        date: '2007/07/07',
        page: '1' 
      }
      };// Simula a query string com a propriedade 'page' definida
    
    const mocktaxisIdTrajectorie = [
      {
        id: 1140,
        taxi_id: 6418,
        date: "2008-02-02T14:22:40.000Z",
        latitude: 116.30508,
        longitude: 39.96525
      }
    ];

     // definindo o retorno do mock
     taxiServices.getTaxisIdTrajectorie.mockResolvedValue(mocktaxisIdTrajectorie);

     // chama a função com objetos simulados
     await getTaxisIdTrajectorie(req,res);
 
     expect(res.status).toHaveBeenCalledWith(200);
 
     expect(res.json).toHaveBeenCalledWith(mocktaxisIdTrajectorie);
  });

  it('deve retornar um erro 500 se não encontrar a trajetórias', async () => {
    const errorMessage = 'Trajeto não encontrado';
    // precisei trazer o req para a simulação dar certo
    const req = {
      params: { id: '1'},
      query: {
        date: '2007/07/07',
        page: '1' 
      }
      };// Simula a query string com a propriedade 'page' definida

    // definindo um retorno do mock
    taxiServices.getTaxisIdTrajectorie.mockRejectedValue(new Error(errorMessage));

    // chama a função com o objeto simulado
    await getTaxisIdTrajectorie(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  })
});

describe('getTaxisLocalizacao', () => {
  it('deve retornar a ultima localização do táxi', async () => {
    const mockTaxis = {
      "id": 10133,
      "plate": "PAOF-6727",
      "trajectories": [
        {
          "id": 2,
          "taxi_id": 10133,
          "date": "2008-02-02T13:47:59.000Z",
          "latitude": 116.37659,
          "longitude": 39.85567
        }
      ]
    }
    
    // definindo o retorno do mock
    taxiServices.getTaxisLocalizacao.mockResolvedValue(mockTaxis);

    // chama a função com objeto simulados 
    await getTaxisLocalizacao(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTaxis);
  })

  it('deve retornar um erro 500 se não encontrar a ultima localização', async () => {
    const errorMessage = 'última localização não encontrada'

    // definindo o retorno do mock
    taxiServices.getTaxisLocalizacao.mockRejectedValue(new Error(errorMessage));

    // chama a função com o objeto simulado
    await getTaxisLocalizacao(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  })
})