import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { PrismaClient } from '@prisma/client'

import authRoutes from './routes/auth'
import contentRoutes from './routes/content'
import mediaRoutes from './routes/media'

const server = Fastify({ logger: true })

server.register(cors, { origin: true })
server.register(jwt, { secret: process.env.JWT_SECRET || 'dev-secret' })
server.register(multipart)
server.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'storage'),
  prefix: '/storage/',
})

declare module 'fastify' {
  export interface FastifyInstance {
    prisma: PrismaClient
  }
}

const prisma = new PrismaClient()
server.decorate('prisma', prisma)

server.get('/health', async () => ({ ok: true, now: new Date().toISOString() }))

server.register(authRoutes, { prefix: '/api/auth' })
server.register(contentRoutes, { prefix: '/api/contents' })
server.register(mediaRoutes, { prefix: '/media' })

const start = async () => {
  try {
    await server.listen({ port: Number(process.env.PORT) || 4000, host: '0.0.0.0' })
    server.log.info(`Server listening on ${process.env.PORT || 4000}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
