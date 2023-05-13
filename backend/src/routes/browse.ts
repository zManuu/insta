import { db, logger, ws } from '../app.js'
import User from '../models/User.js'
import { getUser } from './wsUtil.js'
import config from '@shared/config.json' assert { type: 'json' }
import Post from '../models/Post.js'
import { SearchResult } from '@shared/Types.js'

ws.get('/browse', async (req, res) => {
  logger.log('Starting browse generation for $0.', req.ip)
  
  const data: SearchResult[] = []
  const user = await getUser(req, 'followed', 'followed.posts')

  findNewPosts(user, data)
  await findNewUsers(user, data)
  await fillEntries(user, data)

  res
    .status(200)
    .send(data)
})

function findNewPosts(user: User, data: SearchResult[]) {
  for (const followed of user.followed) {
    for (const post of followed.posts) {
      if (post.createdAt.getTime() > user.latestLogin) {
        logger.log('Found a new post for $0 from $1 ($2)', user.uniqueName, followed.uniqueName, post.title)
        data.push(post)
      }
    }
  }
}

async function findNewUsers(user: User, data: SearchResult[]) {
  const allUsers = await db.find(User)
  for (const allUser of allUsers) {
    if (allUser.createdAt.getTime() > user.latestLogin) {
      logger.log('Found a new user for $0: $1', user.uniqueName, allUser.uniqueName)
      data.push(allUser)
    }
  }
}

/**
 * Fills the data array with entries until a min length is reached
 * so that there never is nothing to browse.
 */
async function fillEntries(user: User, data: SearchResult[]) {
  const desiredLength = Math.floor(config.backend.browsing.min_entries + (Math.random() * (config.backend.browsing.max_entries - config.backend.browsing.min_entries)))
  const fillLength = desiredLength - data.length

  const [ allUsers, allPosts ] = await Promise.all(
    [
      db.find(User),
      db.find(Post, { relations: ['user'] }) 
    ]
  )
  
  if (fillLength < 1) {
    logger.log('No need to fill the dataarray for $0.', user.uniqueName)
    return
  }

  logger.log('Filling the dataarray for $0 with $1 entries.', user.uniqueName, fillLength)

  for (let i=0; i<fillLength; i++) {
    if (Math.random() < config.backend.browsing.chance_for_user) {
      const userIndex = Math.floor(Math.random() * allUsers.length)
      const randomUser = allUsers[userIndex]
      data.push(randomUser)
    } else {
      const postIndex = Math.floor(Math.random() * allPosts.length)
      const randomPost = allPosts[postIndex]
      data.push(randomPost)
    }
  }
}