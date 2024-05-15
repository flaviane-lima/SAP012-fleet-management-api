const express = require('express');
const router = express.Router();
const { getTaxis, getTaxisIdTrajectorie } = require('../controller/taxi');



// listando as rotas 

router.get('/taxis', getTaxis);
router.get('/taxis/:id/trajectories/:date', getTaxisIdTrajectorie)

// Finalmente, exportamos o objeto router para que possa ser usado em outros arquivos
module.exports = router;