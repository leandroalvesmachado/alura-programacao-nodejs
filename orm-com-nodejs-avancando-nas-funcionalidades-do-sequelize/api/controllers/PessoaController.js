// const database = require('../models')
// const Sequelize = require('sequelize')

const { PessoasServices } = require('../services') // igual a const Services = require('../services/index.js')
const pessoasServices = new PessoasServices()

class PessoaController {
    
    static async pegaPessoasAtivas(req, res) {
        try {
            // findAll esta utilizando o default scope do model pessoas
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()

            return res.status(200).json(pessoasAtivas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTodasAsPessoas(req, res) {
        try {
            // utilizando o scope definido no model
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()

            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaPessoa(req, res) {
        const { id } = req.params
        try {
            const umaPessoa = await pessoasServices.pegaUmRegistro({ id })

            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa)

            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await pessoasServices.atualizaRegistro(novasInfos, Number(id))

            const pessoaAtualizada = await pessoasServices.findOne({
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params

        try {
            await pessoasServices.apagaRegistro(Number(id))

            return res.status(200).json({
                message: `id ${id} deletado`
            })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params

        try {
            const registroRestaurado = await pessoasServices.restauraRegistro(Number(id))

            return res.status(200).json(registroRestaurado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    /*
    static async pegaTurmasLotadas(req, res) {
        const lotacaoTurma = 2
        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })

            // resultado da query 
            // {
            //     "count": [
            //         {
            //             "turma_id": 1,
            //             "count": 2
            //         },
            //         {
            //             "turma_id": 4,
            //             "count": 2
            //         }
            //     ],
            //     "rows": [
            //         {
            //             "turma_id": 1
            //         },
            //         {
            //             "turma_id": 4
            //         }
            //     ]
            // }

            // No caso de queries de SELECT, a ordem lógica é a seguinte:
            // FROM: pega as tabelas onde estão os dados
            // WHERE: filtra os dados
            // GROUP BY: agrega os dados
            // HAVING: filtra os dados agregados
            // SELECT: retorna os resultados
            // ORDER BY: ordena os resultados
            // LIMIT: limita a quantidade de resultados

            return res.status(200).json(turmasLotadas.count)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    */

    static async pegaMatriculas(req, res) {  
        const { estudanteId } = req.params
        try {
            const matriculas = await pessoasServices.pegaMatriculasPorEstudante({ id: Number(estudanteId) })
            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params

        try {
            // utilizando transações
            // database.sequelize.transaction(async transacao => {
            //     await database.Pessoas.update(
            //         {
            //             ativo: false
            //         },
            //         {
            //             where: {
            //                 id: Number(estudanteId)
            //             }
            //         },
            //         {
            //             transaction: transacao
            //         }
            //     )
    
            //     await database.Matriculas.update(
            //         {
            //             status: 'cancelado',
            //         },
            //         {
            //             where: {
            //                 estudante_id: Number(estudanteId)
            //             }
            //         },
            //         {
            //             transaction: transacao
            //         }
            //     )
            // })

            // transação de forma manual
            // const transacao = await sequelize.transaction();
            // try {
            //     const personagem = await Personagem.create({
            //         nome: 'Bart',
            //         sobrenome: 'Simpson'
            //     }, { transaction: transacao })
                
            //     await personagem.addParente({
            //         nome: 'Lisa',
            //         sobrenome: 'Simpson'
            //     }, { transaction: transacao })
                
            //     await transacao.commit()
            // } catch (error) {
            //     await transacao.rollback()
            // }

            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))

            return res.status(200).json({
                message: `matriculas ref. estudando ${estudanteId} canceladas`
            })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
}

module.exports = PessoaController