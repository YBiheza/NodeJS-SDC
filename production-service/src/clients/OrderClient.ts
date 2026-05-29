import {
  AvailabilityRequest,
  AvailabilityResponse
} from '@pizza/api-contract'

export class OrderingClient {

  constructor(private baseUrl: string) {}

  async checkAvailability(
    data: AvailabilityRequest
  ): Promise<AvailabilityResponse> {

    const response = await fetch(
      `${this.baseUrl}/availability`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
      }
    )
    console.log("----------", response.status, "----------")
    if (!response.ok) {
      throw new Error('Ordering service unavailable')
    }

    return response.json()
  }

  async markOrderReady(orderId: number) {

    const response = await fetch(
      `${this.baseUrl}/orders/ready`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          orderId
        })
      }
    )

    return response.json()
  }
}