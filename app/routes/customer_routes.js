import express from 'express'
import customerController from '../controllers/customer_controllers.js'

function routerApp(app) {

    const router = express.Router()
    app.use('/api', router)
    router.use('/customer', customerController)

}

export default routerApp
