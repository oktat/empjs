const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authconfig = require('../../config/auth.config.js');
const { sequelize, Sequelize } = require('../models');
const db = require('../models');
db.user = require('../models/user')(sequelize, Sequelize);
const User = db.user;

exports.register = (req, res) => {
    console.log('-----')

    if(!req.body.name) {
        res.status(400).send({
            message: "A név megadása kötelező!"
        })
        return
    }
    if(!req.body.email) {
        res.status(400).send({
            message: "Az email megadása kötelező!"
        })
    }
    if(!req.body.password) {
        res.status(400).send({
            message: "A jelszó megadása kötelező!",
            password: ""
        })
    }
    if(!req.body.password_confirmation) {
        res.status(400).send({
            message: "A jelszó ismétlése kötelező",
            password_confirmation: ""
        })
    }
    if(req.body.password != req.body.password_confirmation) {
        res.status(400).send({
            message: "A jelszavak nem egyeznek!"
        })
    }

    User.findOne({
        where: {
            name: req.body.name
        }
    })
    .then(user => {
        if(user) {
            res.status(400).send({ message: "Already user " + user.name})
        }else {
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password)
            }
            User.create(user)
            .then( result => {
                res.status(201).send(result)
            })
        
        }
    })

    
};

exports.login = (req, res) => {
    console.log('-----')

    if(!req.body.name) {
        res.status(400).send({
            message: "A név megadása kötelező!"
        })
        return
    }
    if(!req.body.password) {
        res.status(400).send({
            message: "A jelszó megadása kötelező!",
            password: ""
        })
    }

    const user = {
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password)
    }
    
    User.findOne({
        where: {
            name: req.body.name
        }
    })
    .then(user => {
        if(!user) {
            return res.status(404).send({ message: "User not found."})
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid) {
            res.status(401).send({
                accessToken: null,
                message: "Invalid password!"
            });
        }
        var token = jwt.sign({ id: user.id }, authconfig.secret, {
            expiresIn: 86400 //24 óra
        });
        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token
        });
    })


    
};