import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../lib/prisma";

import { authenticate } from "../plugins/authenticate";

export async function gamesRoutes(fastify: FastifyInstance){
  fastify.get('/pools/:id/games', {
    onRequest: [authenticate]
  }, async (request) => {
    const getGamesParams = z.object({
      id: z.string()
    })

    const { id } = getGamesParams.parse(request.params)

    const userId = request.user.sub

    const games = await prisma.game.findMany({
      orderBy: {
        date: 'desc'
      },
      include: {
        guesses: {
          where: {
            participant: {
              userId,
              poolId: id
            }
          }
        }
      }
    })

    return { 
      games: games.map(game => {
        return {
          ...game,
          guess: game.guesses.length > 0 ? game.guesses[0] : null,
          guesses: undefined
        }
      }) 
    }
  })
}
