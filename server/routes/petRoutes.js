const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// create a new pet
router.post('/', petController.createPet);

// get all pets
router.get('/', petController.getAllPets);

// get pet by ID
router.get('/:id', petController.getPetById);

// update a pet by ID
router.put('/:id', petController.updatePet);

// delete a pet
router.delete('/:id', petController.deletePet);

module.exports = router;