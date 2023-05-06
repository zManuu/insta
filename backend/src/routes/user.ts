import { db, ws } from '../app.js';
import User from '../models/User.js';

ws.get('/user/:userName', async (req, res) => {
  const user = await db.findOne(User, {
    where: { uniqueName: req.params.userName },
    relations: ['posts']
  })

  if (!user) {
    res.sendStatus(404)
    return
  }

  res
    .status(200)
    .send(user)
})