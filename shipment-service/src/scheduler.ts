import { pgboss } from './jobs/boss'

async function startScheduler() {
  await pgboss.start()

  console.log('Scheduler started')

  pgboss.schedule('0 0 * * *', async () => {
    console.log('Triggering daily cleanup job')

    await pgboss.send('delete-shipments', {})
  })
}

startScheduler()