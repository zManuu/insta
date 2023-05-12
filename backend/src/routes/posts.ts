import { IPost } from '@shared/models/IPost.js'
import { db, logger, ws } from '../app.js'
import Post from '../models/Post.js'
import { getUser } from './wsUtil.js'
import { existsSync } from 'fs'
import { existsPath, getContent, uploadImage } from '../util.js'
import { cwd } from 'process'
import { join } from 'path'

ws.get('/post/:postID', async (req, res) => {
  // todo: parseInt is unsafe here!
  const postID = parseInt(req.params.postID)
  const post = await db.findOne(Post, {
    relations: ['user'],
    where: { id: postID }
  })

  res
    .status(200)
    .send(post)
})

ws.get('/img/:postImg', async (req, res) => {
  const cwd = process.cwd()
  const imgUrl = join(cwd, 'uploads', req.params.postImg)
  const fileExists = await existsPath(imgUrl)

  if (!fileExists) {
    logger.log('$0 tried to access img $1 (404)', req.ip, imgUrl)
    res.sendStatus(404)
    return
  }

  const content = await getContent(imgUrl)

  logger.log('$0 successfully accessed img $1', req.ip, imgUrl)

  res
    .status(200)
    .send(content)
})

ws.post('/post', async (req, res) => {
  const user = await getUser(req)

  const post = new Post()
  post.title = req.body.data.title
  post.description = req.body.data.description
  post.place = req.body.data.place
  post.user = user

  await db.insert(Post, post)

  const uploadImageSuccess = await uploadImage(post.id, req.body.data.base64)

  if (uploadImageSuccess) {
    logger.log('Post was created by $0.', req.ip)
    res.sendStatus(200)
  } else {
    logger.log('Couldn\'t upload image from $0. Now deleting post from db.', req.ip)
    await db.remove(post)
    res.sendStatus(400)
  }

})