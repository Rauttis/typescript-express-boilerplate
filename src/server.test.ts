import server from './server'
import request from 'supertest'

describe('server', () => {
  const req = () => request(server)

  it('/ responds with hello world', async () => {
    const response = await req().get('/')
    expect(response.text).toBe('Hello world!')
  })

  it('/api/health responds with health status', async () => {
    const response = await req().get('/api/health')
    expect(response.text).toBe('Healthy')
  })
})
