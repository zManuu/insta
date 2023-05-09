import { db, ws, logger } from '../app.js'
import User from '../models/User.js'
import { sessions } from './wsUtil.js'

ws.get('/user/:userName', async (req, res) => {
  const user = await db.findOne(User, {
    where: { uniqueName: req.params.userName },
    relations: ['posts', 'followers', 'followed']
  })

  if (!user) {
    res.sendStatus(404)
    return
  }

  res
    .status(200)
    .send(user)
})

ws.post('/follow/:targetName', async (req, res) => {
  const userID = sessions.get(req.ip)
  const targetName = req.params.targetName

  logger.log('User with ID $0 is trying to follow user with name $1', userID, targetName)

  const [user, target] = await Promise.all([
    db.findOne(User, { where: { id: userID }, relations: ['followed'] }),
    db.findOne(User, { where: { uniqueName: targetName }, relations: ['followers'] })
  ])

  if (!user
    || !target
  ) {
    logger.log('Something wasn\'t found on follow: $0, $1', userID, targetName)
    res
      .status(400)
      .send(false)
    return
  }

  if (user.id == target.id) {
    logger.log('User with ID $0 tried to follow themself, canceled.', userID)
    res
      .status(400)
      .send(false)
    return
  }

  const followedIndex = user.followed.findIndex(e => e.uniqueName == targetName)
  const followIndex = target.followers.findIndex(e => e.id == userID)

  if (followedIndex != -1) {

    // Unfollow
    user.followed.splice(followedIndex, 1)
    user.followedCount--
    
    await db.save(user)
    target.followers.splice(followIndex, 1)
    target.followerCount--
    await db.save(target)
    logger.log('User with ID $0 is now not following user with name $1 anymore', userID, targetName)
    
  } else {
    
    // Follow
    user.followed.push(target)
    user.followedCount++
    await db.save(user)

    target.followers.push(user)
    target.followerCount++
    await db.save(target)
    logger.log('User with ID $0 is now following user with name $1', userID, targetName)

  }


  res
    .status(200)
    .send(true)

})