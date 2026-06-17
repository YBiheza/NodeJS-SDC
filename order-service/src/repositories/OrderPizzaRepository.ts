import type { DataBaseRequest, DataBaseResponse, DeletedOrder, MarkOrderReadyRequest, PizzaOrder } from '@pizza/api-contract/index'
import { Neo4jService } from "../../../neo4j/neo4j.service";
import { error } from 'node:console';

export class OrderPizzaRepository {
  constructor (private readonly neo4j: Neo4jService) {}

  async create(data: PizzaOrder ) {
      const result = await this.neo4j.run(
       `
      CREATE (o:Order {
        id: randomUUID(),
        type: $type,
        amount: $amount,
        status: $status
      })

      WITH o

      MATCH (p:Pizza {
        type: $type
      })

      MERGE (o)-[:CONTAINS {amount: $amount}]->(p)
      RETURN 
      o.type AS type,
      o.amount AS amount,
      o.status AS status
      `,
      {
        type: data.type,
        amount: data.amount,
        status: 'in process'
      }
    );
    
    const record = result[0]

    if (!record) {
      throw new Error("OrderRepo answer: order was not created");
    }

    console.log(`Record in database: ${record.get("type")}, ${record.get("amount")}, in status ${record.get("status")}`)

    return {
      type: record.get("type"),
      amount: Number(record.get("amount")),
      status: record.get("status")
    };  
  }
    

  async markAsReady(data: MarkOrderReadyRequest): Promise<DataBaseResponse> {
    const result = await this.neo4j.run(
      `
      MATCH (o:Order)
      WHERE o.type = $type
        AND o.amount = $amount
        AND o.status <> 'ready'

      SET o.status = 'ready'

      WITH
        o.type AS type,
        o.amount AS amount,
        o.status AS status,
        o

      RETURN
        type,
        amount,
        status
      `,
      {
        type: data.type,
        amount: data.amount,
      }
    );

    const record = result[0];

    if(!record) {
      throw new Error('Order repo: no such order in DB')
    }

    console.log(`Record in database: ${record.get("type")}, ${record.get("amount")}, in status ${record.get("status")}`)

    return {
      type: record?.get("type"),
      amount: Number(record?.get("amount")),
      status: record?.get("status"),
    };
  }

  async delete(data: DataBaseRequest): Promise<boolean> {
    const res = await this.neo4j.run(

      `
      MATCH (o:Order)
      WHERE o.type = $type AND
      o.amount = $amount

      DETACH DELETE o

      RETURN count(o) AS deletedcount
      `,
      {
        type: data.type,
        amount: data.amount,
      }
    );
    
    const record = res[0]?.get("deletedcount")

    if (record === 0) {
      throw new Error('OrderRepo: no such')
    }

    return true
  }
}