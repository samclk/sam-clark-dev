import { NextApiHandler } from 'next'
import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string)

const handler: NextApiHandler = (req, res) => {
  console.log({ fire: process.env.SENDGRID_API_KEY })
  if (!process.env.SENDGRID_API_KEY) {
    res.status(500).json({ reason: `Missing env variable` })
  }

  const body = JSON.parse(req.body)

  const message = `
        Name: ${body.firstName} ${body.lastName}\r\n
        Email: ${body.email}\r\n
        Message: ${body.brief}
    `

  const data = {
    to: 'samclark.dev@gmail.com',
    from: 'samclark.dev@gmail.com',
    subject: '[Sam Clark Dev] Contact Form - New Message',
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  }

  sendgrid.send(data)

  res.status(200).json({ name: 'John Doe' })
}

export default handler
