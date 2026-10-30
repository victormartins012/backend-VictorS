const db = require('../banco.js');

// Conta todos os treinos
function contarTodos() {
    return db
        .prepare('SELECT COUNT(*) AS total FROM treinos')
        .get();
}

// Calcula o resumo dos treinos
function obterResumo() {
    return db.prepare(`
        SELECT
            COUNT(*) AS total,
            SUM(duracao) AS minutos,
            AVG(duracao) AS media
        FROM treinos
    `).get();
}

// Lista todos os treinos com filtros
function listarTodos(minimo, busca) {
    let sql = 'SELECT * FROM treinos';

    const parametros = [];
    const condicoes = [];

    if (minimo !== undefined) {
        condicoes.push('duracao >= ?');
        parametros.push(Number(minimo));
    }

    if (busca !== undefined) {
        condicoes.push('nome LIKE ?');
        parametros.push(`%${busca}%`);
    }

    if (condicoes.length > 0) {
        sql += ' WHERE ' + condicoes.join(' AND ');
    }

    sql += ' ORDER BY duracao DESC';

    return db.prepare(sql).all(...parametros);
}

// Busca um treino pelo ID
function buscarPorId(id) {
    return db
        .prepare('SELECT * FROM treinos WHERE id = ?')
        .get(id);
}

// Cria um treino
function criar(nome, duracao) {
    const resultado = db
        .prepare('INSERT INTO treinos (nome, duracao) VALUES (?, ?)')
        .run(nome, duracao);

    return buscarPorId(resultado.lastInsertRowid);
}

// Atualiza um treino
function atualizar(id, nome, duracao) {
    db.prepare(
        'UPDATE treinos SET nome = ?, duracao = ? WHERE id = ?'
    ).run(nome, duracao, id);

    return buscarPorId(id);
}

// Remove um treino
function remover(id) {
    const resultado = db
        .prepare('DELETE FROM treinos WHERE id = ?')
        .run(id);

    return resultado.changes > 0;
}

module.exports = {
    contarTodos,
    obterResumo,
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    remover
};