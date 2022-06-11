import { test } from '@japa/runner'

test('display healthy check', async ({ client }) => {
  const response = await client.get('/health')

  response.assertStatus(200)
})
