import express from 'express'
const app = express()

import morgan from 'morgan'
app.use( morgan('tiny') )

import routerApp from './routes/customer_routes.js'
app.use(express.json())
routerApp(app)

app.listen( process.env.PORT || 4000, () => {
    console.log(`Servidor iniciado en http://localhost:${process.env.PORT}`)
    console.log(`Index en http://localhost:${process.env.PORT}/api/customer`)
})
