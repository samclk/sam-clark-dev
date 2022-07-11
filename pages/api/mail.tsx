import { NextApiHandler } from 'next'
import sendgrid from '@sendgrid/mail'

const handler: NextApiHandler = async (req, res) => {
  const { EMAIL_TO, EMAIL_FROM, SENDGRID_API_KEY } = process.env

  if (!EMAIL_TO || !EMAIL_FROM || !SENDGRID_API_KEY) {
    res.status(500).json({ reason: `Missing env variable` })
    return
  }

  sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string)

  const body = JSON.parse(req.body)

  const message = `
        Name: ${body.firstName} ${body.lastName}\r\n
        Email: ${body.email}\r\n
        Message: ${body.brief}
    `

  const data = {
    to: EMAIL_TO,
    from: EMAIL_FROM,
    subject: '[Sam Clark Dev] Contact Form - New Message',
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  }

  try {
    await sendgrid.send(data)
    res.status(200).json({ name: 'Email sent' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default handler
