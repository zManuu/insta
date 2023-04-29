import { db, logger, ws } from '../app.js'
import User from '../models/User.js'
import { sessions } from './wsUtil.js'

ws.get('/login/:name/:password', async (req, res) => {
  if (sessions.has(req.ip)) {
    res.sendStatus(403)
    return
  }

  const user = await db.findOneBy(User, { uniqueName: req.params.name })

  if (!user
    || user.password != req.params.password
  ) {
    res.sendStatus(403)
    return
  }

  logger.log('Session $0 was created for $1', user.id, req.ip)

  sessions.set(req.ip, user.id)
  res.sendStatus(200)
})