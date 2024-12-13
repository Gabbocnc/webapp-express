const express = require('express');
const router = express.Router();
const filmsControllers = require('../controllers/filmsControllers.js');


router.get('/', filmsControllers.index);

router.get('/films/:id', filmsControllers.show);

router.post('/films/:id', filmsControllers.addReview);



module.exports = router;
