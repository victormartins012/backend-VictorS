const repository = require('../repositories/treinosRepository.js');

// Validação dos dados
function validarTreino(corpo) {
    if (!corpo || typeof corpo.nome !== 'string' || corpo.nome.trim() === '') {
        return 'O campo nome e obrigatorio e deve ser um texto.';
    }

    if (typeof corpo.duracao !== 'number' || corpo.duracao <= 0) {
        return 'O campo duracao e obrigatorio e deve ser um numero maior que zero.';
    }

    // Exercício 14: duração máxima de 180 minutos
    if (corpo.duracao > 180) {
        return 'A duracao do treino nao pode ser maior que 180 minutos.';
    }

    return null;
}

// Conta todos os treinos
function contarTodos() {
    return repository.contarTodos();
}

// Mostra o resumo
function obterResumo() {
    return repository.obterResumo();
}

// Lista todos os treinos
function listarTodos(minimo, busca) {
    return repository.listarTodos(minimo, busca);
}

// Busca um treino
function buscarPorId(id) {
    return repository.buscarPorId(id);
}

// Cria um treino
function criarTreino(corpo) {
    const erro = validarTreino(corpo);

    if (erro !== null) {
        return { erro: erro };
    }

    const novo = repository.criar(corpo.nome, corpo.duracao);

    return { treino: novo };
}

// Atualiza um treino
function atualizarTreino(id, corpo) {
    const existente = repository.buscarPorId(id);

    if (existente === undefined) {
        return { naoEncontrado: true };
    }

    const erro = validarTreino(corpo);

    if (erro !== null) {
        return { erro: erro };
    }

    const atualizado = repository.atualizar(
        id,
        corpo.nome,
        corpo.duracao
    );

    return { treino: atualizado };
}

// Remove um treino
function removerTreino(id) {
    const existente = repository.buscarPorId(id);

    if (existente === undefined) {
        return { naoEncontrado: true };
    }

    repository.remover(id);

    return { removido: true };
}

module.exports = {
    validarTreino,
    contarTodos,
    obterResumo,
    listarTodos,
    buscarPorId,
    criarTreino,
    atualizarTreino,
    removerTreino
};