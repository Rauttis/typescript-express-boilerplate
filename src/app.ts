import server from './server'

const port = process.env.PORT || 3000

server.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`Listening in port ${port}`)
})
