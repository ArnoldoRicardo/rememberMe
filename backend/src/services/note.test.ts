import { newNota } from './note'

test('test add note', async () => {
  const data = {
    content: 'soy una nota',
    title: 'soy un titulo'
  }
  const result = await newNota(data.content, data.title)
  console.log(result)
})
