import { ShipmentRepository } from "../repositories/ShipmentRepository";
import { pgboss } from "../jobs/boss";

export async function registerWorker () {
    console.log('REGISTERING WORKER');
    pgboss.work('delete-shipments', async() => {
    console.log('Воркер: Worker started');
    const repo = new ShipmentRepository()

    const deleted = await repo.deleteExpired()
    })
}