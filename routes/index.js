module.exports = app => {
    const router = require('express').Router()
    router.get('/', (req, res) => {
        res.json({messge: 'Dolgozók REST API'})
    })
    app.use('/api', router)
}
