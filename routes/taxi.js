const express = require('express');
const router = express.Router();
const { getTaxis, getTaxisIdTrajectorie, getTaxisLocalizacao } = require('../controller/taxi');



// listando as rotas 

router.get('/taxis', getTaxis);
router.get('/taxis/:id/trajectories/:date', getTaxisIdTrajectorie);
router.get('/taxis/trajectories/last', getTaxisLocalizacao);


// Finalmente, exportamos o objeto router para que possa ser usado em outros arquivos
module.exports = router;