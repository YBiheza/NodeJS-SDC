type Batch = {
    amount: number
}

export function calculateAmountOfFullBatches(batch: Batch, batchSize: number) {
  return Math.floor(batch.amount / batchSize)
}

export function calculateSizeOfIncompleteBatch(batch: Batch, batchSize: number) {
  return batch.amount % batchSize
}
    
// Logic for splitting into batches -> generate X full batches 
// where X is calculated by calculateAmountOfFullBatches, and then
// combine generated array with another batch of size
// calculateSizeOfIncompleteBatch 