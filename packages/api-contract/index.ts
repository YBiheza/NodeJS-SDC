import type { TPizza } from "./shared types/TPizza"
export interface PizzaOrder {
  type: TPizza
  amount: number
}

export interface AvailabilityRequest {
  type: TPizza
  amount: number
}

export interface AvailabilityResponse {
  available: boolean
}

export interface MarkOrderReadyRequest {
  type: TPizza
  amount: number
}

export interface DataBaseResponse {
  id: number,
  type: string,
  amount: number,
  status: string
}
export interface MarkOrderReadyResponse {
  success: boolean
  pizza: DataBaseResponse[]
}