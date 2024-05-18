const taxiService = require('../services/taxiServices');


  exports.getTaxis = async (req, resp) => {
    const paginacao = parseInt(req.query.page);
    try {
      const taxis = await taxiService.getTaxis(paginacao);
      console.log(taxis);
      resp.status(200).json(taxis);
    } catch (error) {
      resp.status(500).json({ error: error.message });
    }

    };

    exports.getTaxisIdTrajectorie = async (req, resp) => {
      const id = parseInt(req.params.id, 10);
      const date = req.params.date;
      const paginacao = parseInt(req.query.page);
      try {
        const taxiTrajectorie = await taxiService.getTaxisIdTrajectorie(id, date, paginacao);
        console.log(taxiTrajectorie);
        resp.status(200).json(taxiTrajectorie);
      } catch (error) {
        resp.status(500).json({ error: error.message });
      }
    };

    exports.getTaxisLocalizacao = async (req, resp) => {
      const paginacao = parseInt(req.query.page);
      try {
        const taxisUltimaLocalizacao = await taxiService.getTaxisLocalizacao(paginacao);
        console.log(taxisUltimaLocalizacao);
        resp.status(200).json(taxisUltimaLocalizacao);
      } catch (error) {
        resp.status(500).json({ error: error.message });
      }
  
      };


