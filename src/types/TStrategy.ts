import type { IShipment } from "../interfaces/IShipment";

export type TStrategy = (shipment: IShipment) =>
    | {result: 'rejected'; reason: string} 
    | {result: 'completed!'}
    | {result: 'split'; shipment: IShipment[]}
