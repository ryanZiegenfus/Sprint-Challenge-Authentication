const knexConfig = require('../../knexfile');
const knex = require('knex');
const db = knex(knexConfig.development)

function add(student) {
    return db('users')
    .insert(student);
}

function findById(username) {
    return db('users')
    .where({ username });
}

function find() {
    return db('users');
}


module.exports = {
    find,
    findById,
    add,
}