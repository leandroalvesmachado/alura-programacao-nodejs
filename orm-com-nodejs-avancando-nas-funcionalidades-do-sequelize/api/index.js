const express = require('express')
const routes = require('./routes')

const app = express()
const port = 3000

routes(app)

// app.get('/teste', (req, res) => res
//     .status(200)
//     .send({ mensagem: 'boas-vindas à API'}))

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app