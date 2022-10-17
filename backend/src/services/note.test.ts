import { newNota } from './note'

test('test add note', async () => {
  const data = {
    content: 'soy una nota',
    title: 'soy un titulo'
  }
  const result = await newNota(data.content, data.title)
  expect(typeof result.id).toBe('number')
  expect(result.title).toBe(data.title)
  expect(result.content).toBe(data.content)
  console.log(result.id)
})
