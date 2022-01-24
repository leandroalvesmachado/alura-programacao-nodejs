const bodyParser = require('body-parser')
const pessoas = require('./pessoasRoute')
//adicionamos as rotas de niveis e turmas
const niveis = require('./niveisRoute')
const turmas = require('./turmasRoute')

// module.exports = app => {
//     app.use(bodyParser.json())

//     // rota de teste
//     app.get('/', (req, res) => res.send('ola'))

//     app.use(pessoas)
// }

// adicionamos as instâncias de níveis e turmas
// e refatoramos um pouco a função
module.exports = app => {
    app.use(
        bodyParser.json(),
        pessoas,
        niveis,
        turmas
    )
}