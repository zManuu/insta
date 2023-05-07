import { IPost } from '@shared/models/IPost.js';
import { db, logger, ws } from '../app.js';
import Post from '../models/Post.js';
import { getUser } from './wsUtil.js';

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

ws.post('/post', async (req, res) => {
  
  // ! doesn't have id
  const body: IPost = req.body

  const user = await getUser(req)

  if (!user) {
    res.sendStatus(403)
    return
  }

  const post = new Post()
  post.title = body.title
  post.imgUrl = body.imgUrl
  post.description = body.description
  post.place = body.place
  post.user = user

  await db.insert(Post, post)
  logger.log('Post was created with options $0 by $1', JSON.stringify(body), req.ip)
  res.sendStatus(200)

})