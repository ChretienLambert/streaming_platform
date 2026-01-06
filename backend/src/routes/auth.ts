import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import argon2 from 'argon2'

export default async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
  fastify.post('/signup', async (req, reply) => {
    const body = req.body as any
    if (!body?.email || !body?.password) {
      return reply.code(400).send({ error: 'email and password required' })
    }
    const existing = await fastify.prisma.user.findUnique({ where: { email: body.email } })
    if (existing) return reply.code(409).send({ error: 'user already exists' })
    const hash = await argon2.hash(body.password)
    const user = await fastify.prisma.user.create({ data: { email: body.email, password: hash } })
    const token = await fastify.jwt.sign({ userId: user.id })
    return { user: { id: user.id, email: user.email }, token }
  })

  fastify.post('/login', async (req, reply) => {
    const body = req.body as any
    if (!body?.email || !body?.password) return reply.code(400).send({ error: 'missing credentials' })
    const user = await fastify.prisma.user.findUnique({ where: { email: body.email } })
    if (!user) return reply.code(401).send({ error: 'invalid credentials' })
    const ok = await argon2.verify(user.password, body.password)
    if (!ok) return reply.code(401).send({ error: 'invalid credentials' })
    const token = await fastify.jwt.sign({ userId: user.id })
    return { user: { id: user.id, email: user.email, role: user.role }, token }
  })
}
