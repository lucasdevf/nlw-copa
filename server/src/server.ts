import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import Fastify from 'fastify'

import { authRoutes } from './routes/auth.routes'
import { gamesRoutes } from './routes/games.routes'

import { guessesRoutes } from './routes/guesses.routes'

import { poolsRoutes } from './routes/pools.routes'
import { usersRoutes } from './routes/users.routes'

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true
  })

  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET_KEY as string
  })

  await fastify.register(poolsRoutes) 
  await fastify.register(usersRoutes)
  await fastify.register(guessesRoutes)
  await fastify.register(authRoutes)
  await fastify.register(gamesRoutes)

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()