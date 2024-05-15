const taxiService = require('../services/taxiServices');


  exports.getTaxis = async (req, resp) => {
    const paginacao = parseInt(req.query.page);
    try {
      const taxis = await taxiService.getTaxis(paginacao);
      resp.status(200).json(taxis);
    } catch (error) {
      resp.status(500).json({ error: error.message });
    }

    };

    exports.getTaxisIdTrajectorie = async (req, resp) => {
      const id = req.params.id;
      const date = req.params.date;
      const paginacao = parseInt(req.query.page);
      try {
        const taxiTrajectorie = await taxiService.getTaxisIdTrajectorie(id, date, paginacao);
        resp.status(200).json(taxiTrajectorie);
      } catch (error) {
        resp.status(500).json({ error: error.message });
      }
    };


