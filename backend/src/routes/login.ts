import { db, logger, ws } from '../app.js'
import User from '../models/User.js'
import { sessions } from './wsUtil.js'

ws.post('/login', async (req, res) => {
  const user = await db.findOneBy(User, { uniqueName: req.body.data.name })

  if (!user
    || user.password != req.body.data.password
  ) {
    res
      .status(403)
      .send(false)
    return
  }

  if (!sessions.has(req.ip)) {
    logger.log('Session $0 was created for $1', user.id, req.ip)
    sessions.set(req.ip, user.id)
  }
  
  user.latestLogin = Date.now()
  logger.log('$0 logged in as $1', req.ip, user.uniqueName)

  await db.save(user)
  
  res
  	.status(200)
    .send(true)
})