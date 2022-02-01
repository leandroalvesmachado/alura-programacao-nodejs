const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')
const MatriculaController = require('../controllers/MatriculaController')


const router = Router()

// router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
// router.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
// router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
// router.post('/pessoas', PessoaController.criaPessoa)
// router.put('/pessoas/:id', PessoaController.atualizaPessoa)
// router.delete('/pessoas/:id', PessoaController.apagaPessoa)
// router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)

// router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)
// router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
// router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)
// router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)
// router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restauraMatricula)
// router.get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas)
// router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma)
// router.get('/pessoas/matricula/lotada', PessoaController.pegaTurmasLotadas)
// router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)

router
    .get('/pessoas', PessoaController.pegaTodasAsPessoas)  
    .get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)  
    .get('/pessoas/:id', PessoaController.pegaPessoa)  
    .get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas)  
    .get('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.pegaUmaMatricula)  
    .get('/pessoas/matricula/:turmaId/confirmadas', MatriculaController.pegaMatriculasPorTurma)  
    .get('/pessoas/matricula/lotada', MatriculaController.pegaTurmasLotadas)  
    .post('/pessoas', PessoaController.criaPessoa)  
    .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)  
    .post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)  
    .post('/pessoas/:estudanteId/matricula', MatriculaController.criaMatricula)  
    .post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', MatriculaController.restauraMatricula)  
    .put('/pessoas/:id', PessoaController.atualizaPessoa)  
    .put('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.atualizaMatricula)  
    .delete('/pessoas/:id', PessoaController.apagaPessoa)  
    .delete('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.apagaMatricula) 



module.exports = router