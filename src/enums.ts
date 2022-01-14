// File for sharing enum type with declaration file and index.ts exports
// This may be generalized in the future for exporting other implementation objects

export enum TransactionStatus {
  Unknown = 0,
  Pending,
  Finalized,
  Executed,
  Sealed,
  Expired,
}
