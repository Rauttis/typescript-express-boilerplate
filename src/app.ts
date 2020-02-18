import express from 'express'
import bodyParser from 'body-parser'

const port = process.env.PORT || 3000

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

app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`Listening in port ${port}`)
})
