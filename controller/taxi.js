const taxiService = require('../services/taxiServices');


  exports.getTaxis = async (req, resp) => {
    // obtém o valor do parametro 'page' da string de consulta
    let paginacao = req.query.page;

    try {
      // se a 'paginacao' for undefind, vai ser definido como 1
      if ( paginacao === undefined) {
        paginacao = 1
    } 
      // Converte a 'paginacao' para um número inteiro
      paginacao = parseInt(paginacao);
      
      // Verificando se 'paginacao' é diferente de número ou menor que 1
      if (!paginacao || paginacao < 1) {
        // vai retornar um erro.
        return resp.status(400).json({ error: 'valor da paginação inválido' });
      }
      // está chamando o serviço para obter os táxis com a 'paginacao' especificada
      const taxis = await taxiService.getTaxis(paginacao);
      console.log(taxis);
      // vai trazer a lista de táxis
      resp.status(200).json(taxis);
    } catch (error) {
      // não passou em nunhuma condição cai no erro
      resp.status(500).json({ error: error.message });
    }

    };

    exports.getTaxisIdTrajectorie = async (req, resp) => {
      
      let paginacao = req.query.page;
      try {
        // se a 'paginacao' for undefind, vai ser definido como 1
      if ( paginacao === undefined) {
        paginacao = 1
    } 
      // Converte a 'paginacao' para um número inteiro
      paginacao = parseInt(paginacao);
      
      // Verificando se 'paginacao' é diferente de número ou menor que 1
      if (!paginacao || paginacao < 1) {
        // vai retornar um erro.
        return resp.status(400).json({ error: 'valor da paginação inválido' });
      }
        const id = parseInt(req.params.id, 10);
        const date = req.params.date;
        const taxiTrajectorie = await taxiService.getTaxisIdTrajectorie(id, date, paginacao);
        console.log(taxiTrajectorie);
        resp.status(200).json(taxiTrajectorie);
      } catch (error) {
        resp.status(500).json({ error: error.message });
      }
    };

    exports.getTaxisLocalizacao = async (req, resp) => {
      let paginacao = req.query.page;
      try {
        // se a 'paginacao' for undefind, vai ser definido como 1
      if ( paginacao === undefined) {
        paginacao = 1
    } 
      // Converte a 'paginacao' para um número inteiro
      paginacao = parseInt(paginacao);
      
      // Verificando se 'paginacao' é diferente de número ou menor que 1
      if (!paginacao || paginacao < 1) {
        // vai retornar um erro.
        return resp.status(400).json({ error: 'valor da paginação inválido' });
      }
        const taxisUltimaLocalizacao = await taxiService.getTaxisLocalizacao(paginacao);
        console.log(taxisUltimaLocalizacao);
        resp.status(200).json(taxisUltimaLocalizacao);
      } catch (error) {
        resp.status(500).json({ error: error.message });
      }
  
      };


