const Location = require('../models/Location')

const locationController = {
    createLocation: (req, res) => {
        const { name } = req.body;

        // check if name field is empty
        if (!name) {
            return res.status(400).json('Name is required')
        }

        // check if location already exists
        Location.findOne({ where: { name }} )
            .then(existingLocation => {
                if (existingLocation) {
                    return res.status(400).json(`Location ${existingLocation} already exists`)
                }
                Location.create({ name, breed})
                    .then(newLocation => {
                        res.status(201).json(`Location ${newLocation} created`)
                    })
                    .catch(error => {
                        res.status(500).json(`server error ${error}`)
                    })
            })
    },
    updateLocation: (req, res) => {
        const locationId = req.params.id;
        // ===========update object below==================
        const { name, breed } = req.body;

        //find Location by ID
        Location.findByPk(locationId) 
            .then(location => {
                if (!location) {
                    return res.status(404).json(`Location ${location} not found`)
                }
                location.update({ name, breed })
                .then(updatedLocation => {
                    res.status(200).json(`location data updated successfully: ${updatedLocation}`)
                })
                .catch(error => {
                    res.status(500).json(`server error: ${error}`)
                })
            })
            .catch(error => {
                res.status(500).json(`server error: ${error}`)
            })
    },
    deleteLocation: (req, res) => {
        Location.findByPk(locationId)
            .then(location => {
                if (!location) {
                    return res.status(404).json(`Location ${location} not found`)
                }

                location.destroy()
                    .then(() => {
                        res.status(200).json(`location ${location} deleted successfully`)
                    })
                    .catch(error => {
                        res.status(500).json(`Internal server error: ${error}`)
                    })
            })
            .catch(error => {
                res.status(500).json(`Internal server error ${error}`)
            })
    },
    getAllLocations: (req, res) => {
        Location.findAll()
        .then(locations => {
            res.status(200).json(locations)
        })
        .catch(error => {
            res.status(500).json(`internal server error: ${error}`)
        })
    },
    getLocationById: (req, res) => {
        const locationId = req.params.id;
        
        Location.findByPk(locationId)
        .then(location => {
            if (!location) {
                return res.status(404).json('location not found')
            }
            res.status(200).json(location)
        })
        .catch(error => {
            res.status(500).json(`Internal server error: ${error}`)
        })
    }
}

module.exports = locationController;