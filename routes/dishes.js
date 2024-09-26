var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var DishesService = require('../services/DishesService');
var db = require('../models');
var dishesService = new DishesService(db);

/* GET All dishes */
router.get('/', async function (req, res, next) {
	try {
		const Dishes = await dishesService.getAllDishes();
		res.status(200).send({ statuscode: 200, dishes: Dishes });
	} catch (error) {
		console.log(error);
	}
});

/* GET Specific dish from the dish name */
router.get('/:dishname', async function (req, res, next) {
	try {
		const Dishes = await dishesService.getDish(req.params.dishname);
		res.status(200).send({ statuscode: 200, dishes: Dishes });
	} catch (error) {
		res.status(500).send({ statuscode: 500, error: error.message });
	}
});

/* POST create a new dish for the country and add country if the country is not in the database*/
router.post('/', jsonParser, async function (req, res, next) {
	try {
		let { Name, Country } = req.body;
		let result = await dishesService.createDish(Name, Country);
		res.status(200).send(result);
	} catch (error) {
		res.status(500).send({ statuscode: 500, error: error.message });
	}
});

router.delete('/', async function (req, res, next) {
	try {
		const { id } = req.body;
		const dish = await dishesService.deleteDish(id);
		if (dish)
			res.status(200).send({ statusCode: 200, message: 'Successfully deleted dish' });
		else res.status(404).send({ statusCode: 404, message: 'No dish with provided id exists' });

	} catch (error) {
		res.status(500).send({ message: error.message });
	}
})

module.exports = router;
