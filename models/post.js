const mongoose = require('mongoose');
const { sequelize } = require('../config/db')
const { DataTypes } = require('sequelize');
const User = require('./users')

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});
Post.belongsTo(User, { foreignKey: 'author_id' })

module.exports = Post
