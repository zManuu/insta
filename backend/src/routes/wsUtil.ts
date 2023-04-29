import { Express, Request, json } from 'express'
import { logger } from '../app.js'
import { isNumber } from '@shared/Helper.js'

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
function tryAuth(req: Request<any, any, any, any, Record<string, any>>) {
  if (!('sessionid' in req.headers)
    || typeof req.headers.sessionid != 'string'
  ) {
    logger.log('headers doesn\'t have sessionid ($0)', req.ip)
    return false
  }

  const sessionid = req.headers.sessionid

  if (!isNumber(sessionid)) {
    logger.log('header sessionid isn\'t of type number ($0)', req.ip)
    return
  }

  if (!sessions.has(sessionid)) {
    logger.log('No sessionid found: $0 ($1)', sessionid, req.ip)
    return
  }
  
  return true
}

function initMiddleware(ws: Express) {
  ws.use(json())

  ws.get(/.*/g, (req, res, next) => {
    logger.log('Receiving $0 from $1', req.path, req.ip)

    if (needsAuthentication(req.path)) {
      logger.log('Path $0 requires auth for $1', req.path, req.ip)
      if (!tryAuth(req)) {
        logger.log('Auth failed for $0', req.ip)
        res.sendStatus(403)
        return
      }
    }

    next()
  })
}

export {
  tryAuth,
  sessions,
  initMiddleware
}