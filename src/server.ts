import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.enable('trust proxy')
app.disable('x-powered-by')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (_req, res) => {
  res.send('Hello world!')
})

app.get('/api/health', (_req, res) => {
  res.send('Healthy')
})

export default app
