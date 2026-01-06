import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fs'
import path from 'path'
import mime from 'mime-types'

export default async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
  fastify.get('/:fileName', async (req: any, reply) => {
    const fileName = req.params.fileName
    const filePath = path.join(process.cwd(), 'storage', fileName)
    if (!fs.existsSync(filePath)) return reply.code(404).send({ error: 'file not found' })
    const stat = fs.statSync(filePath)
    const fileSize = stat.size
    const range = req.headers.range
    const contentType = mime.lookup(filePath) || 'application/octet-stream'

    if (range) {
      // Example: bytes=0-1023
      const match = range.match(/bytes=(\d*)-(\d*)/)
      if (!match) return reply.code(416).send()
      const start = match[1] ? parseInt(match[1], 10) : 0
      const end = match[2] ? parseInt(match[2], 10) : fileSize - 1
      if (start >= fileSize || end >= fileSize) return reply.code(416).send()
      reply.code(206)
      reply.header('Content-Range', `bytes ${start}-${end}/${fileSize}`)
      reply.header('Accept-Ranges', 'bytes')
      reply.header('Content-Length', String(end - start + 1))
      reply.header('Content-Type', contentType)
      const stream = fs.createReadStream(filePath, { start, end })
      return reply.send(stream)
    }

    reply.header('Content-Length', String(fileSize))
    reply.header('Content-Type', contentType)
    return reply.send(fs.createReadStream(filePath))
  })
}
