const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/database.js')


class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize, 
        modelName: 'Comment'
    }
)

module.exports = Comment

const User = require('./User.js')
const Location = require('./Location.js')

User.hasMany(Comment)
Location.hasMany(Comment)
Comment.belongsTo(User)
Comment.belongsTo(Location)

