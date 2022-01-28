'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Pessoas extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models) {
            // define association here
            Pessoas.hasMany(models.Turmas, {
                foreignKey: 'docente_id'
            }) // Por padrão busca pela coluna PessoaId no relacionamento

            Pessoas.hasMany(models.Matriculas, {
                foreignKey: 'estudante_id',
                // condição de busca no relacionamento (tipo um where), escopo
                scope: {
                    status: 'confirmado'
                },
                // aulasMatriculadas (nome do escopo) = getAulasMatriculadas
                as: 'aulasMatriculadas'
            })
        }
    }
    Pessoas.init({
        nome: {
            type: DataTypes.STRING,
            validate: {
                // criando função de validação personalizada
                funcaoValidadora: function(dado) {
                    if (dado.length < 3) {
                        throw new Error('o campo deve ter mais que 3 caracteres')
                    }
                }
            }
        },
        ativo: DataTypes.BOOLEAN,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'dados do tipo e-mail inválido'
                }
            }
        },
        role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Pessoas',
        paranoid: true,
        // If you want to give a custom name to the deletedAt column
        // deletedAt: 'destroyTime'
        defaultScope: {
            where: {
                ativo: true
            }
        },
        scopes: {
            todos: {
                where: {}
            }
        }
    })
    
    return Pessoas
}