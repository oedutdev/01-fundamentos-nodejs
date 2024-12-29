// CommonJS => require
// ESModules => import/export

import http from 'node:http'

/**
 * Criar usuários
 * Listagem de usuários
 * Edição de usuários
 * Remoção de usuários
 * 
 * - HTTP:
 *  - Método HTTP
 *  - URL
 * 
 * GET, POST, PUT, PATCH, DELETE
 * 
 * GET => buscar um recurso do back-end
 * POST => criar um recurso no back-end
 * PUT => editar/atualizar um recurso no back-end
 * PATCH => editar/atualizar uma informação única/específica de um recurso no back-end
 * DELETE => deletar um recurso do back-end
 * 
 * GET /users => buscando usuários no back-end
 * POST /users => criar um usuário no back-end
 */

const server = http.createServer((req, res) => {
    const { method, url } = req
    console.log(method, url)

    if (method === 'GET' && url === '/users') {
        // Early return
        return this.end('Listagem de usuários')
    }

    if (method === 'POST' && url === '/users') {
        return this.end('Criação de usuário')
    }

    return res.end('Hello World')
})

server.listen(3333)
