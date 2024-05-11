const Pet = require('../models/Pet')

const petController = {
    createPet: (req, res) => {
        const { name, breed } = req.body;

        // check if name field is empty
        if (!name) {
            return res.status(400).json('Name is required')
        }

        // check if pet already exists
        Pet.findOne({ where: { name }} )
            .then(existingPet => {
                if (existingPet) {
                    return res.status(400).json(`Pet ${existingPet} already exists`)
                }
                Pet.create({ name, breed})
                    .then(newPet => {
                        res.status(201).json(`Pet ${newPet.name} created`)
                    })
                    .catch(error => {
                        res.status(500).json(`server error ${error}`)
                    })
            })
    },
    updatePet: (req, res) => {
        const petId = req.params.id;
        const { name, breed } = req.body;

        //find pet by ID
        Pet.findByPk(petId) 
            .then(pet => {
                if (!pet) {
                    return res.status(404).json(`Pet ${pet} not found`)
                }
                pet.update({ name, breed })
                .then(updatedPet => {
                    res.status(200).json(`pet data updated successfully: ${updatedPet}`)
                })
                .catch(error => {
                    res.status(500).json(`server error: ${error}`)
                })
            })
            .catch(error => {
                res.status(500).json(`server error: ${error}`)
            })
    },
    deletePet: (req, res) => {
        const petId = req.params.id

        Pet.findByPk(petId)
            .then(pet => {
                if (!pet) {
                    return res.status(404).json(`Pet ${pet} not found`)
                }

                pet.destroy()
                    .then(() => {
                        res.status(200).json(`Pet ${pet} deleted successfully`)
                    })
                    .catch(error => {
                        res.status(500).json(`Internal server error: ${error}`)
                    })
            })
            .catch(error => {
                res.status(500).json(`Internal server error ${error}`)
            })
    },
    getAllPets: (req, res) => {
        Pet.findAll()
        .then(pets => {
            res.status(200).json(pets)
        })
        .catch(error => {
            res.status(500).json(`internal server error: ${error}`)
        })
    },
    getPetById: (req, res) => {
        const petId = req.params.id;
        
        Pet.findByPk(petId)
        .then(pet => {
            if (!pet) {
                return res.status(404).json('pet not found')
            }
            res.status(200).json(pet)
        })
        .catch(error => {
            res.status(500).json(`Internal server error: ${error}`)
        })
    }
}

module.exports = petController;