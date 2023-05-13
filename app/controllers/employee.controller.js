const { sequelize, Sequelize } = require('../models')
const db = require('../models')
db.employees = require('../models/employee')(sequelize, Sequelize)
const Employee = db.employees

 
exports.index = (req, res) => {
    Employee.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Hiba! Az adatbázis lekérése sikertelen"
            }).json();
        });
}

exports.store = (req, res) => {
    if(!req.body.name) {
        res.status(400).send({
            message: "A név megadása kötelező"
        })
        return
    }
    const employee = {
        name: req.body.name,
        city: req.body.city,
        salary: req.body.salary
    }
    Employee.create(employee)
    .then( result => {
        res.send(result)
    })
}

exports.update = (req, res) => {
    const { id } = req.params;
    if(!req.body.name) {
        res.status(400).send({
            message: "A név megadása kötelező"
        })
        return
    }
    const employee = {
        name: req.body.name,
        city: req.body.city,
        salary: req.body.salary
    };
    
    Employee.update(employee,{
        where: { id: id }
    })
    .then((result) => {
        res.status(200).send({
            msg: 'A frissítés sikeres', 
            employee: employee
        });
    })
    .catch(err => {
        res.status(500).sendStatus({
            message:
            err.message || "Hiba! Az adatbázis frissítése sikertelen"
        });
    });
    
};

exports.destroy = (req, res) => {
    const { id } = req.params;
    Employee.destroy({
        where: { id: id }
    })
    .then(result => {        
        res.status(200).send({Deleted: result}).json()
    })
    .catch(err => {
        res.status(500).send({error: 'Hiba! A törlés sikertlen!'}).json();
    });    
}