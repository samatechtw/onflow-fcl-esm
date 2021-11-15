/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@samatech/onflow-fcl-esm' {
  type AnyJson = boolean | number | string | null | IJsonArray | IJsonObject;

  interface IJsonObject {
    [key: string]: AnyJson;
  }

  export interface TransactionSignature {
    keyId: number;
    addr: string;
    signature: string;
  }

  export interface TransactionData {
    message: string;
  }

  export interface Account {
    address: string; // The address of the account
    balance: number; // The FLOW balance of the account in 10*6.
    code: string; //	The code of any Cadence contracts stored in the account.
    contracts: Record<string, unknown>; //	Map of deployed contract name to cadence string.
    keys: Record<string, unknown>; // Any contracts deployed to this account.
  }

  export interface AuthZ extends Account {
    tempId: string;
    addr: string;
    keyId: number;
    signingFunction: (data: TransactionData) => TransactionSignature;
  }

  export type FclAuthorization = AuthZ | ((acct: Account) => AuthZ);

  export interface Argument {
    value: any;
    xform: any; // FType
  }

  interface TransactionResult {
    snapshot: () => any;
    subscribe: (callback?: any) => any;
    onceFinalized: (callback?: any) => any;
    onceExecuted: (callback?: any) => any;
    onceSealed: (callback?: any) => any;
  }

  interface Interaction {
    tag: string;
    assigns: Record<string, unknown>;
    status: string;
    reason: string | null;
    accounts: Record<string, unknown>;
    params: Record<string, unknown>;
    arguments: Record<string, unknown>;
    message: Record<string, unknown>;
    /*
    {
      cadence: null;
      refBlock: null;
      computeLimit: null;
      proposer: null;
      payer: null;
      authorizations: [];
      params: [];
      arguments: [];
    };
    */
    proposer: string | null;
    authorizations: unknown[];
    payer: string | null;
    events: Record<string, unknown>;
    /*{
      eventType: null;
      start: null;
      end: null;
      blockIds: [];
    };
    */
    transaction: {
      id: string | null;
    };
    block: {
      id: number | null;
      height: number | null;
      isSealed: boolean;
    };
    account: {
      addr: string | null;
    };
    collection: {
      id: string | null;
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IJsonArray extends Array<AnyJson> {}

  type Decoder = (dictionary, decoders, stack) => Record<any, any>;
  type DecoderGroup = Record<string, Decoder>;
  type Response = IJsonObject;

  interface BlockObject {
    id: string;
    parentId: string;
    height: number;
    timestamp: any;
    collectionGuarantees: any;
    blockSeals: any;
    signatures: Uint8Array;
  }

  function send(args: any, opts?: any): Promise<Response>;

  function decode(
    decodeInstructions: any,
    customDecoders?: DecoderGroup,
    stack?: Array<any>,
  ): Promise<any>;

  function latestBlock(isSealed: boolean): Promise<BlockObject>;

  function sansPrefix(address: string): string;

  function tx(transactionId: any): TransactionResult;

  // SDK
  function script(...args: any): Interaction;
  function transaction(...args: any): Interaction;

  function payer(authz: AuthZ): (ix: Interaction) => Interaction;
  function proposer(authz: AuthZ): (ix: Interaction) => Interaction;
  function authorizations(ax: AuthZ[]): (ix: Interaction) => Interaction;
  function args(ax: Argument[]): (ix: Interaction) => Interaction;
  function arg(value: any, xform: any): Argument;

  function limit(computeLimit: number): (ix: Interaction) => Interaction;

  export {
    decode,
    send,
    latestBlock,
    sansPrefix,
    script,
    transaction,
    authorizations,
    args,
    arg,
    payer,
    proposer,
    limit,
    tx,
  };
}
