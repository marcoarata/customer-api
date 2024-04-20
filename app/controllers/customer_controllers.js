import express from 'express'
import fs from 'fs'

const customerController = express.Router()

// Ruta GET para obtener todos los clientes
customerController.get('/', (req, res) => {
    fs.readFile('./app/data/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).json({ message: 'Internal Server Error' })
            return
        }
        const customers = JSON.parse(data).customer
        res.json(customers)
    })
})

// Ruta GET para obtener un cliente por su ID
customerController.get('/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./app/data/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).json({ message: 'Internal Server Error' })
            return
        }
        const customers = JSON.parse(data).customer
        const search = customers.find(customer => customer.id === id)
        if (search) {
            res.json(search)
        } else {
            res.status(404).json({ message: 'Customer not found' })
        }
    })
})

// Ruta POST para crear un nuevo cliente
customerController.post('/', (req, res) => {
    const body = req.body
    fs.readFile('./app/data/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).json({ message: 'Internal Server Error' })
            return
        }
        const jsonData = JSON.parse(data)
        const new_customer = {
            id: String(jsonData.customer.length + 1),
            name: body.name,
            rut: body.rut,
            email: body.email,
            whatsapp: body.whatsapp
        }
        jsonData.customer.push(new_customer)
        fs.writeFile('./app/data/db.json', JSON.stringify(jsonData), 'utf-8', err => {
            if (err) {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
                return
            }
            res.status(201).json({
                message: 'Successfully Created Customer',
                data: new_customer
            })
        })
    })
})

// Ruta PATCH para actualizar un cliente por su ID
customerController.patch('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    fs.readFile('./app/data/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).json({ message: 'Internal Server Error' })
            return
        }
        const jsonData = JSON.parse(data)
        const index = jsonData.customer.findIndex(customer => customer.id === id)
        if (index !== -1) {
            jsonData.customer[index] = { ...jsonData.customer[index], ...body }
            fs.writeFile('./app/data/db.json', JSON.stringify(jsonData), 'utf-8', err => {
                if (err) {
                    console.error(err)
                    res.status(500).json({ message: 'Internal Server Error' })
                    return
                }
                res.json({
                    message: 'Successfully Updated Customer',
                    data: jsonData.customer[index]
                })
            })
        } else {
            res.status(404).json({ message: 'Customer not found' })
        }
    })
})

// Ruta DELETE para eliminar un cliente por su ID
customerController.delete('/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./app/data/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).json({ message: 'Internal Server Error' })
            return
        }
        const jsonData = JSON.parse(data)
        const index = jsonData.customer.findIndex(customer => customer.id === id)
        if (index !== -1) {
            const deletedCustomer = jsonData.customer.splice(index, 1)[0];
            fs.writeFile('./app/data/db.json', JSON.stringify(jsonData), 'utf-8', err => {
                if (err) {
                    console.error(err)
                    res.status(500).json({ message: 'Internal Server Error' })
                    return
                }
                res.json({
                    message: 'Successfully Deleted Customer',
                    data: deletedCustomer
                })
            })
        } else {
            res.status(404).json({ message: 'Customer not found' })
        }
    })
})

export default customerController

