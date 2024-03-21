module.exports = app => {
    const router = require('express').Router();
    const employees = require('../app/controllers/employee.controller');
    const auth = require('../app/controllers/auth.controller');
    const { verifyToken } = require('../app/middleware/authjwt');

    router.get('/employees',  employees.index);
    // router.post('/employees', [verifyToken], employees.store);
    router.post('/employees', employees.store);
    router.delete('/employees/:id', [verifyToken], employees.destroy);
    router.put('/employees/:id', [verifyToken], employees.update);
 
    router.post('/register', auth.register);
    router.post('/login', auth.login);
 
    app.use('/api', router);

}
