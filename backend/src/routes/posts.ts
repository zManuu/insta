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

  const content = await getContent(imgUrl, 'base64')

  logger.log('$0 successfully accessed img $1', req.ip, imgUrl)

  res
    .status(200)
    .send(content)
})

ws.post('/post/:t/:d/:p', async (req, res) => {
  const user = await getUser(req)

  console.log(req.body)

  const post = new Post()
  post.title = req.body.title
  post.description = req.body.description
  post.place = req.body.place
  post.user = user

  await db.insert(Post, post)

  const uploadImageSuccess = await uploadImage(post.id, req.body.base64img)

  if (uploadImageSuccess) {
    logger.log('Post was created with options $0 by $1', JSON.stringify(req.body), req.ip)
    res.sendStatus(200)
  } else {
    logger.log('Couldn\'t upload image... $0, $1, $2', JSON.stringify(req.body), req.ip, JSON.stringify(post))
    res.sendStatus(400)
  }

})