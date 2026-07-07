import { DataBaseResponse, PizzaOrder } from '@pizza/api-contract';
import { boss } from '../jobs/staleOrderJob';
import { OrderPizzaRepository } from '../repositories/OrderPizzaRepository';

export async function registerWorkers() {
    boss.work<DataBaseResponse>('check-order-status', async (jobs) => {
    console.log('Worker received', jobs.length, 'jobs');
    for (const job of jobs ) {
        console.log(job.data);
        const { id } = job.data;
        const repo = new OrderPizzaRepository;

        if (!id) {
            throw new Error ("Repo: No such Id")
        } 
        const order = await repo.getById(id)

        if (!order) {
            throw new Error ("Repo: No order with such Id")
        }

        if (order.status !== 'ready') {
            await repo.markOld(id);
        }
    }
  });
}