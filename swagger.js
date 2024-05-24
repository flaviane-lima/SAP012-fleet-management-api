const  swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        "openapi": "3.0.3",
        "info": {
          "title": "Fleet Management - OpenAPI 3.0",
          "description": "Neste projeto, será construido uma  a API REST de um Software de Gestão de Frota para consultar as localizações dos veículos de uma empresa de táxis em Pequim, China._ E aqui a documentação do que foi feito com o link do repositório do github.\n \n  links:\n - [repositorio](https://github.com/flaviane-lima/SAP012-fleet-management-api)",
          "termsOfService": "http://swagger.io/terms/",
          "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
          },
          "version": "1.0.11"
        },
        "externalDocs": {
          "description": "Find out more about Swagger",
          "url": "http://swagger.io"
        },
        "servers": [
          {
            "url": "https://petstore3.swagger.io/api/v3"
          }
        ],
        "paths": {
          "/taxis": {
            "get": {
              "tags": [
                "taxis"
              ],
              "summary": "Retorna a lista de táxis disponíveis.",
              "description": "Retorna uma página de táxis de acordo com os parâmetros de paginação fornecidos.",
              "operationId": "getTaxis",
              "parameters": [
                {
                  "name": "page",
                  "in": "query",
                  "description": "Número da página desejada.",
                  "required": false,
                  "schema": {
                    "type": "integer",
                    "default": 1
                  }
                },
                {
                  "name": "limit",
                  "in": "query",
                  "description": "Quantidade de táxis por página.",
                  "required": false,
                  "schema": {
                    "type": "integer",
                    "default": 10
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "OK. Lista de táxis retornada com sucesso.",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "description": "ID do táxi."
                            },
                            "placa": {
                              "type": "string",
                              "description": "Placa do táxi."
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "500": {
                  "description": "Erro interno do servidor. Não foi possível retornar a lista de táxis."
                }
              }
            }
          },
          "/taxis/:id/trajectories/:date": {
            "get": {
              "tags": [
                "taxis"
              ],
              "summary": "Retorna as trajetórias de um táxi em uma data específica.",
              "description": "Retorna as trajetórias de um táxi com o ID especificado na data especificada.",
              "operationId": "getTaxisIdTrajectorie",
              "parameters": [
                {
                  "name": "page",
                  "in": "query",
                  "description": "Número da página desejada.",
                  "required": false,
                  "schema": {
                    "type": "integer",
                    "default": 1
                  }
                },
                {
                  "name": "limit",
                  "in": "query",
                  "description": "Quantidade de táxis por página.",
                  "required": false,
                  "schema": {
                    "type": "string",
                    "format": "date",
                    "example": "2008-02-02"
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "OK. última localização do táxi retornadas com sucesso.",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "description": "ID do registro."
                            },
                            "taxi_id": {
                              "type": "integer",
                              "description": "ID do táxi."
                            },
                            "date": {
                              "type": "string",
                              "format": "date-time",
                              "description": "Data e hora da localização registrada."
                            },
                            "latitude": {
                              "type": "number",
                              "format": "double",
                              "description": "Latitude da localização registrada."
                            },
                            "longitude": {
                              "type": "number",
                              "format": "double",
                              "description": "Longitude da localização registrada."
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "500": {
                  "description": "Erro interno do servidor. Não foi possível retornar as trajetórias do táxi."
                }
              }
            }
          },
          "/taxis/trajectories/last": {
            "get": {
              "tags": [
                "taxis"
              ],
              "summary": "Retorna a útima localicação.",
              "description": "Retorna a última localização reportada por cada táxi.",
              "operationId": "getTaxisLocalizacao",
              "parameters": [
                {
                  "name": "page",
                  "in": "query",
                  "description": "Número da página desejada.",
                  "required": false,
                  "schema": {
                    "type": "integer",
                    "default": 1
                  }
                },
                {
                  "name": "limit",
                  "in": "query",
                  "description": "Quantidade de táxis por página.",
                  "required": false,
                  "schema": {
                    "type": "string",
                    "format": "date",
                    "example": "2008-02-02"
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "OK. ultima localização do táxi retornada com sucesso.",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "description": "ID do registro."
                            },
                            "placa": {
                              "type": "string",
                              "description": "Placa do táxi."
                            },
                            "trajectories": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "taxi_id": {
                                    "type": "integer",
                                    "description": "ID do táxi"
                                  },
                                  "date": {
                                    "type": "string",
                                    "format": "date-time",
                                    "description": "Data e hora da localização registrada."
                                  },
                                  "latitude": {
                                    "type": "number",
                                    "format": "double",
                                    "description": "Latitude da localização registrada."
                                  },
                                  "longitude": {
                                    "type": "number",
                                    "format": "double",
                                    "description": "Longitude da localização registrada."
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "500": {
                  "description": "Erro interno do servidor. Não foi possível retornar a ultima localização do táxi."
                }
              }
            }
          }
        }
      },
      apis: ['./router/*.js'],
};

// gera as especificações do swaggers
const swaggerSpec = swaggerJsdoc(options)

// função para configurar a documentação Swagger
function swaggerDocs(app) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // documentação no formato Json
    app.get('/docs.json', (req,res) => {
        res.setHeader('Content-Type', 'application/json')
        res.sen(swaggerSpec)
    })
}

// exportar a função de configuração do Swagger
module.exports =  swaggerDocs;