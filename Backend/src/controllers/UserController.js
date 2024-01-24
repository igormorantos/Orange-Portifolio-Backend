const cnn = require('../repository/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJwt = require('../services/secretkey')


const addUser = async (req, res) => {
    const { name, email, password, country } = req.body

    const salt = await bcrypt.genSalt(10);
    const criptpass = await bcrypt.hash(password, salt);
    
    const newUser = await cnn.query('INSERT INTO user (name, email, password, country) VALUES (:name, :email, :password, :country)', {
        replacements: { name, email, password: criptpass, country },
        type: cnn.QueryTypes.INSERT
    });

    const user = await cnn.query('SELECT * FROM user WHERE email = :email', {
        replacements: { email },
        type: cnn.QueryTypes.SELECT
    });

    res.status(201).json(user)
}


module.exports = addUser