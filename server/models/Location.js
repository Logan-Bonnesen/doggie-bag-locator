const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

class Location extends Model {}

Location.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true, 
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        crossStreets: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Location'
    }
)

module.exports = Location