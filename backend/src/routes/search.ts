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
    db.find(Post, {
      relations: ['user']
    })
  ])

  const s = req.params.input

  const filteredUsers = allUsers
    .filter(e =>
      e.displayName.includes(s)
      || e.uniqueName.includes(s)
    )

  const filteredPosts = allPosts
    .filter(e => 
      e.title.includes(s)
      || e.description.includes(s)
      || e.place?.includes(s)
      || e.user.displayName.includes(s)
      || e.user.uniqueName.includes(s)
    )

  const results: SearchResult[] = [
    ...filteredUsers,
    ...filteredPosts
  ]

  res
    .status(200)
    .send(results)
})