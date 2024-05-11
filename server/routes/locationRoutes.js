const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// create a new location
router.post('/', locationController.createLocation);

// get all locations
router.get('/', locationController.getAllLocations);

// get location by ID
router.get('/:id', locationController.getLocationById);

// update a location by ID
router.put('/:id', locationController.updateLocation);

// delete a location
router.delete('/:id', locationController.deleteLocation);

module.exports = router;