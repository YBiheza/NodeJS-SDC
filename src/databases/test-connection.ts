import { db } from './index'

async function test() {
  try {
    const result = await db.execute('SELECT 1 as test')
    console.log('DB OK:', result)
  } catch (err) {
    console.error('DB ERROR:', err)
  }
}

test()