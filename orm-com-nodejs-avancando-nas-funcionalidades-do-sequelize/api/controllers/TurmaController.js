const database = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class TurmaController {

    static async pegaTodasAsTurmas(req, res) {
        //  req.query = captura parametros na url (query string)
        const { data_inicial, data_final } = req.query
        
        const where = {}
        data_inicial || data_final ? where.data_inicio = {} : null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null

        // const where = {
        //     data_inicio: {
        //         [Op.gte]: data_inicial, // >=
        //         [Op.lte]: data_final // <=
        //     }
        // }

        try {
            const todosAsTurmas = await database.Turmas.findAll({
                where
            })

            return res.status(200).json(todosAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaTurma(req, res) {
        const { id } = req.params
        try {
            const umaTurma = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json(umaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaTurma(req, res) {
        const novaTurma = req.body
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma)

            return res.status(200).json(novaTurmaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaTurma(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Turmas.update(novasInfos, {
                where: {
                    id: Number(id)
                }
            })

            const turmaAtualizada = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json(turmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaTurma(req, res) {
        const { id } = req.params

        try {
            await database.Turmas.destroy({
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json({
                message: `id ${id} deletado`
            })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraTurma(req, res) {
        const { id } = req.params
        
        try {
            await database.Turmas.restore( {where: { id: Number(id) } } )
            
            return res.status(200).json({ mensagem: `id ${id} restaurado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController