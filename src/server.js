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
 * 
 * Stateful - Stateless
 * Cabeçalhos (Requisição/resposta) => Metadados
 * 
 * HTTP Status Code
 */

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    users.push({
      id: 1,
      name,
      email,
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)
