import { db, ws } from '../app.js'
import Post from '../models/Post.js'
import User from '../models/User.js'
import { SearchResult } from '@shared/Types.js'

ws.get('/search/:input', async (req, res) => {
  const [
    allUsers,
    allPosts
  ] = await Promise.all([
    db.find(User),
    db.find(Post)
  ])

  const filteredUsers = allUsers
    .filter(e => e.displayName.includes(req.params.input) || e.uniqueName.includes(req.params.input))

  const filteredPosts = allPosts
    .filter(e => e.title.includes(req.params.input) || e.description.includes(req.params.input) || e.place?.includes(req.params.input))

  const results: SearchResult[] = [
    ...filteredUsers,
    ...filteredPosts
  ]

  res
    .status(200)
    .send(results)
})