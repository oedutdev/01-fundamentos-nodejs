// CommonJS => require
// ESModules => import/export

import http from 'node:http'

import { json } from './middlewares/json.js'
import { routes } from './routes.js'

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
 * 
 * Stateful - Stateless
 * Cabeçalhos (Requisição/resposta) => Metadados
 * 
 * HTTP Status Code
 */

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário (HTTPs)

// http://localhost:3333/users?userId=1&name=Eduardo

// GET http://localhost:3333/users/1
// DELETE http: //localhost:3333/users/1

// POST http://localhost:3333/users

// Edição e remoção

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    req.params = { ...routeParams.groups }

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
