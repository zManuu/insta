import { db, logger, ws } from '../app.js';
import { sessions } from './wsUtil.js';
import User from '../models/User.js';
import { IUser } from '@shared/models/IUser.js';

ws.post('/register', async (req, res) => {
  if (sessions.has(req.ip)) {
    res.sendStatus(403)
    return
  }

  // ! doesn't have id
  const body: IUser = req.body
  const existingUser = await db.findOneBy(User, { uniqueName: body.uniqueName })

  if (existingUser) {
    res
      .status(400)
      .send('Unique-Name taken')
    return
  }

  const user = new User()
  user.uniqueName = body.uniqueName
  user.displayName = body.displayName
  user.password = body.password
  user.avatarUrl = body.avatarUrl
  user.description = body.description

  await db.insert(User, user)
  logger.log('Account created with options $0 for $1', JSON.stringify(body), req.ip)
  res.sendStatus(200)
})