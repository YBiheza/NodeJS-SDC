// worker.ts
import { pgboss } from './jobs/boss'
import { ShipmentRepository } from './repositories/ShipmentRepository'

async function startWorker() {
  await pgboss.start()

  await pgboss.work('delete-shipments', async () => {
    const repo = new ShipmentRepository()
    await repo.deleteExpired()
  })

  console.log('Worker started')
}

startWorker()