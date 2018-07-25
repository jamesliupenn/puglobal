const express = require('express');
const router = express.Router();
const Item = require('../Item').Item;

// Params
router.param('UPC', (req, res, next, upc) => {
	Item.findOne({ UPC: upc }, (err, doc) => {
		if (err) return next(err);
		if (!doc) {
			err = new Error('No documents were found');
			// err.status(404);
			return next(err);
		}
		req.item = doc;
		return next();
	});
});

router.param('StyleNumber', (req, res, next, styleNumber) => {
	Item.find({ StyleNumber: styleNumber }, (err, doc) => {
		if (err) return next(err);
		if (!doc) {
			err = new Error('No documents were found');
			// err.status(404);
			return next(err);
		}
		req.styleNumber = doc;
		return next();
	});
});

// Routes
router.get('/', (req, res, next) => {
	Item.find({}).sort({ createdAt: -1 }).exec((err, items) => {
		if (err) return next(err);
		res.json(items);
	});
});

// Searching by UPC number
router.get('/:UPC', (req, res) => {
	res.json(req.item);
});

// Searching by Style Number
router.get('/sn/:StyleNumber', (req, res) => {
	res.json(req.styleNumber);
});

module.exports = router;
