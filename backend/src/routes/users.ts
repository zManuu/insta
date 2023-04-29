import { db, ws } from '../app.js'
import User from '../models/User.js'

ws.get('/users/:searchInput', async (req, res) => {
  const allUsers = await db.find(User)

  const filteredUsers = allUsers
    .filter(e => e.displayName.includes(req.params.searchInput) || e.uniqueName.includes(req.params.searchInput))

  res
    .status(200)
    .send(filteredUsers)
})