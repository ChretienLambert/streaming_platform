import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import path from 'path'
import fs from 'fs'

export default async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
  fastify.get('/', async (req, reply) => {
    const items = await fastify.prisma.content.findMany({ orderBy: { createdAt: 'desc' } })
    return { items }
  })

  fastify.get('/:id', async (req, reply) => {
    const id = Number((req.params as any).id)
    const item = await fastify.prisma.content.findUnique({ where: { id } })
    if (!item) return reply.code(404).send({ error: 'not found' })
    return item
  })

  fastify.post('/', async (req: any, reply) => {
    // For now accept {title,type,description,fileName}
    const body = req.body as any
    const data: any = {
      title: body.title,
      type: body.type || 'video',
      description: body.description || null,
      filePath: body.filePath || null,
    }
    const created = await fastify.prisma.content.create({ data })
    return created
  })
}
