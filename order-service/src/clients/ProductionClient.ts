import { AvailabilityRequest, AvailabilityResponse, DataBaseResponse, MarkOrderReadyResponse } from "@pizza/api-contract";

export class ProductionClient {
    async CheckAvailability (pizza: AvailabilityRequest): Promise<AvailabilityResponse> {
        const response = await fetch('http://localhost:3000/availability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: pizza.type,
                amount: pizza.amount
            } satisfies AvailabilityRequest),
        })
        /*const raw = await response.text()
        console.log('RAW RESPONSE:', raw)
        return JSON.parse(raw) as AvailabilityResponse*/
        return await response.json() as AvailabilityResponse
    }

    async MakePizza(pizza: DataBaseResponse): Promise<MarkOrderReadyResponse> {
        const response = await fetch('http://localhost:3000/produce', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: pizza.type,
                amount: pizza.amount
            } satisfies DataBaseResponse)
        })
        return await response.json() as MarkOrderReadyResponse
    }
}