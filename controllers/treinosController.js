const service = require('../services/treinosService.js');

// GET /treinos/total
function total(req, res) {
    const resultado = service.contarTodos();

    res.status(200).json(resultado);
}

// GET /treinos/resumo
function resumo(req, res) {
    const resultado = service.obterResumo();

    res.status(200).json(resultado);
}

// GET /treinos
function listar(req, res) {
    const minimo = req.query.minimo;
    const busca = req.query.busca;

    const treinos = service.listarTodos(minimo, busca);

    res.status(200).json(treinos);
}

// GET /treinos/:id
function buscarUm(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            erro: 'Id deve ser um numero inteiro.'
        });
    }

    const treino = service.buscarPorId(id);

    if (treino === undefined) {
        return res.status(404).json({
            erro: 'Treino nao encontrado.'
        });
    }

    res.status(200).json(treino);
}

// POST /treinos
function criar(req, res) {
    const resultado = service.criarTreino(req.body);

    if (resultado.erro !== undefined) {
        return res.status(400).json({
            erro: resultado.erro
        });
    }

    res.status(201).json(resultado.treino);
}

// PUT /treinos/:id
function atualizar(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            erro: 'Id deve ser um numero inteiro.'
        });
    }

    const resultado = service.atualizarTreino(id, req.body);

    if (resultado.naoEncontrado === true) {
        return res.status(404).json({
            erro: 'Treino nao encontrado.'
        });
    }

    if (resultado.erro !== undefined) {
        return res.status(400).json({
            erro: resultado.erro
        });
    }

    res.status(200).json(resultado.treino);
}

// DELETE /treinos/:id
function remover(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            erro: 'Id deve ser um numero inteiro.'
        });
    }

    const resultado = service.removerTreino(id);

    if (resultado.naoEncontrado === true) {
        return res.status(404).json({
            erro: 'Treino nao encontrado.'
        });
    }

    res.status(204).end();
}

module.exports = {
    total,
    resumo,
    listar,
    buscarUm,
    criar,
    atualizar,
    remover
};