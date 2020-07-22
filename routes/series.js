const express = require('express')
const seriesController = require('../controllers/series')

const router = express.Router()

const Serie = require('../models/serie')
const models = {
  Serie
}

router.get('/', seriesController.index.bind(null, models))

router.get('/nova', seriesController.novaForm)
router.post('/nova', seriesController.novaProcess.bind(null, models))

router.get('/excluir/:id', seriesController.excluir.bind(null, models))

router.get('/update/:id', seriesController.updateForm.bind(null, models))
router.post('/update/:id', seriesController.updateProcess.bind(null, models))

router.get('/info/:id', seriesController.info.bind(null, models))
router.post('/info/:id', seriesController.addComment.bind(null, models))

module.exports = router