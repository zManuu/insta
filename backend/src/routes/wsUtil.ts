import { Express, Request, Response, json, raw } from 'express'
import cors from 'cors'
import { db, logger } from '../app.js'
import User from '../models/User.js'

/**
 * Maps a sessionid (key) to an user-id (value)
 */
const sessions = new Map<string, number>()

/**
 * Login/home/register/help/* don't need authentication
 * @param route the complete route of the request
 * @returns whether or not the given route needs authentication
 */
function needsAuthentication(route: string) {
  return !/\/(login|home|register|help).*/g.test(route)
}

/**
 * Checks if a request is authenticated
 * @param req the request made to the webserver (ip is used)
 * @returns whether or not the user is logged in
 */
function tryAuth(req: Request) {
  if (!sessions.has(req.ip)) {
    logger.log('No sessionid found for $0', req.ip)
    return false
  }
  
  return true
}

async function getUser(req: Request, ...relations: string[]): Promise<User> {
  if (!tryAuth(req))
    return undefined

  return db.findOne(User,
    {
      where: { id: sessions.get(req.ip) },
      relations: relations
    }
  )
}

function initMiddleware(ws: Express) {
  ws.use(json({ limit: '10mb' }))
  ws.use(cors())

  ws.use(/.*/g, (req, res, next) => {
    logger.log('Receiving $0 from $1 with body $2', req.path, req.ip, JSON.stringify(req.body))

    if (needsAuthentication(req.path)) {
      logger.log('Path $0 requires auth for $1', req.path, req.ip)
      if (!tryAuth(req)) {
        logger.log('Auth failed for $0', req.ip)
        res.sendStatus(403)
        return
      }
      logger.log('Auth was successfull for $0', req.ip)
    }

    next()
  })
}

export {
  tryAuth,
  sessions,
  initMiddleware,
  getUser,
}