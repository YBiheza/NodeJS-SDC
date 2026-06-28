import { DataBaseResponse, MarkOrderReadyRequest } from '@pizza/api-contract'

export class OrderingClient {
  
  async MarkAsReady (data: MarkOrderReadyRequest): Promise<DataBaseResponse[]> {
    const response = await fetch('http://localhost:3001/orders/ready', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: data.type,
        amount: data.amount
      }),
    })
    return response.json()
  }
}