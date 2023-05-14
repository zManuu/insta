import { db, ws } from '../app.js'
import Message from '../models/Message.js'
import User from '../models/User.js'
import { getUser, sessions } from './wsUtil.js'

ws.get('/chats', async (req, res) => {
  const userId = sessions.get(req.ip)
  const user = await db.findOne(User, {
    where: { id: userId },
    relations: ['receivedMessages', 'sentMessages', 'receivedMessages.from', 'sentMessages.to']
  })

  if (!user) {
    res
      .status(400)
      .send('Invalid session')
    return
  }

  const chats: User[] = []
  
  for (const msg of user.sentMessages) {
    if (!chats.some(e => e.id == msg.to.id))
      chats.push(msg.to)
  }

  for (const msg of user.receivedMessages) {
    if (!chats.some(e => e.id == msg.from.id))
      chats.push(msg.from)
  }

  // at this point, chats contains all the users the requesting user has had contact with

  res
    .status(200)
    .send(chats)
})

ws.get('/chat/:targetName', async (req, res) => {
  const user = await getUser(req, 'sentMessages', 'sentMessages.to', 'receivedMessages', 'receivedMessages.from')
  const target = await db.findOneBy(User, { uniqueName: req.params.targetName })
  const sentMessages = user.sentMessages
    .filter(e => e.to.uniqueName == req.params.targetName)
  const receivedMessages = user.receivedMessages
    .filter(e => e.from.uniqueName == req.params.targetName)
  const allMessages = [...sentMessages, ...receivedMessages]

  res
    .status(200)
    .send({
      user: target,
      messages: allMessages
    })
})

ws.post('/message', async (req, res) => {
  const [from, to] = await Promise.all([
    db.findOneBy(User, { id: sessions.get(req.ip) }),
    db.findOneBy(User, { uniqueName: req.body.data.targetName })]
  )

  // todo: seperation (inexplicit error message)
  if (!from
    || !to) {
    res
      .status(400)
      .send('Invalid session / target not found')
    return
  }

  const message = new Message()
  message.from = from
  message.to = to
  message.content = req.body.data.content
  message.type = req.body.data.type

  await db.insert(Message, message)

  res
    .status(200)
    .send(message)
})