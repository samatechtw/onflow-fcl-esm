declare module '@onflow/config' {
  import { FlowConfig } from './config.d';

  export const config: FlowConfig;
}

declare module '@onflow/fcl-config' {
  import { flowConfig } from '@onflow/fcl-config';

  export { flowConfig };
}

declare module '*.cdc' {
  const content: string;
  export default content;
}

declare module '@onflow/types' {
  import {
    Bool,
    Character,
    String,
    Argument,
    Address,
    Optional,
    Fix64,
    UFix64,
    Int,
    Int8,
    Int16,
    Int32,
    Int64,
    Int128,
    Int156,
    UInt,
    UInt8,
    UInt16,
    UInt32,
    UInt64,
    UInt128,
    UInt156,
    Word8,
    Word16,
    Word32,
    Word64,
    Array,
    Dictionary,
    Path,
  } from '@onflow/types';

  export {
    Bool,
    Character,
    String,
    Argument,
    Address,
    Optional,
    Fix64,
    UFix64,
    Int,
    Int8,
    Int16,
    Int32,
    Int64,
    Int128,
    Int156,
    UInt,
    UInt8,
    UInt16,
    UInt32,
    UInt64,
    UInt128,
    UInt156,
    Word8,
    Word16,
    Word32,
    Word64,
    Array,
    Dictionary,
    Path,
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@samatech/onflow-fcl-esm' {
  import { FlowConfig } from 'config.d';
  import { TransactionStatus } from 'enums';

  export { TransactionStatus };

  export type AnyJson = boolean | number | string | null | IJsonArray | IJsonObject;

  export interface IJsonObject {
    [key: string]: AnyJson;
  }

  export interface TransactionSignature {
    keyId: number;
    addr: string;
    signature: string;
  }

  export interface SigningData {
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
    signingFunction: (data: SigningData) => TransactionSignature;
  }

  export type FclAuthorization =
    | AuthZ
    | ((acct: Account) => AuthZ)
    | ((acct: Account) => Promise<AuthZ>);

  export interface Service {
    authn?: string;
    f_type: string;
    f_vsn: string;
    id?: string;
    identity?: Record<string, string>;
    provider?: Record<string, string>;
    scoped?: Record<string, string>;
    type: string;
    uid: string;
  }

  export interface UserSnapshot {
    addr: string | null;
    cid: string | null;
    expiresAt: number | null;
    f_type: string;
    f_vsn: string;
    loggedIn: boolean | null;
    services?: Service[];
  }

  export interface CadenceEvent {
    type: string;
    transactionId?: string;
    transactionIndex?: number;
    eventIndex?: number;
    data?: Record<string, unknown>;
  }

  export interface CadenceResult {
    events: CadenceEvent[];
    status: number;
    statusCode: number;
    errorMessage: string;
    // TODO -- require once implemented in FCL
    // https://github.com/onflow/fcl-js/issues/926
    transactionId?: string;
  }

  export interface Argument {
    value: any;
    xform: any; // FType
  }

  export interface TransactionResult {
    snapshot: () => any;
    subscribe: (callback?: any) => any;
    onceFinalized: (callback?: any) => any;
    onceExecuted: (callback?: any) => any;
    onceSealed: (callback?: any) => any;
  }

  export interface TransactionData {
    events: CadenceEvent[];
    status: TransactionStatus;
    errorMessage: string;
    statusCode: number;
  }

  export interface Interaction {
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

  export type Pipe = (ix: Interaction) => Interaction;

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IJsonArray extends Array<AnyJson> {}

  export type Decoder = (dictionary, decoders, stack) => Record<any, any>;
  export type DecoderGroup = Record<string, Decoder>;
  export type Response = IJsonObject;

  export interface CollectionGuaranteeObject {
    collectionId: string;
    signatures: TransactionSignature[];
  }

  export interface BlockObject {
    id: string;
    parentId: string;
    height: number;
    timestamp: any;
    collectionGuarantees: CollectionGuaranteeObject;
    blockSeals: any;
    signatures: TransactionSignature[];
  }

  export function send(args: any, opts?: any): Promise<Response>;

  export function decode(
    decodeInstructions: any,
    customDecoders?: DecoderGroup,
    stack?: Array<any>,
  ): Promise<any>;

  export function latestBlock(isSealed: boolean): Promise<BlockObject>;

  export function sansPrefix(address: string): string;

  export function tx(transactionId: any): TransactionResult;

  export function authenticate(): Promise<UserSnapshot>;
  export function unauthenticate(): void;
  export function reauthenticate(): Promise<UserSnapshot>;
  export function authorization(account: Account): Promise<FclAuthorization>;
  export function verifyUserSignatures(
    msg: string,
    compSigs: [TransactionSignature],
  ): Promise<[unknown]>;

  type SubscribeCallback = (user: UserSnapshot) => void;

  export interface CurrentUser {
    authenticate: typeof authenticate;
    unauthenticate: typeof unauthenticate;
    authorization: typeof authorization;
    signUserMessage: (msg: string) => Promise<[TransactionSignature]>;
    subscribe: (callback: SubscribeCallback) => void;
    snapshot: Promise<UserSnapshot>;
    resolveArgument: () => Promise<Argument>;
  }

  export function currentUser(): CurrentUser;

  export function config(): FlowConfig;

  // SDK
  export function getBlock(isSealed?: boolean): Pipe;
  export function getTransaction(transactionId: string): Pipe;
  export function getTransactionStatus(transactionId: string): Pipe;
  export function getEventsAtBlockIds(eventType: string, blockIds: string[]): Pipe;
  export function getEventsAtBlockHeightRange(
    eventName: string,
    fromBlockHeight: number,
    toBlockHeight: number,
  ): Pipe;

  export function build(fns?: Pipe[]): Pipe;
  export function script(code: string): Interaction;
  export function transaction(...args: any): Interaction;

  export function payer(authz: FclAuthorization): Pipe;
  export function proposer(authz: FclAuthorization): Pipe;
  export function authorizations(ax: FclAuthorization[]): Pipe;
  export function args(ax: Argument[]): Pipe;
  export function arg(value: any, xform: any): Argument;
  export function limit(computeLimit: number): Pipe;
}
