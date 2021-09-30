/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'vite-flow-fcl' {
  type AnyJson = boolean | number | string | null | IJsonArray | IJsonObject;

  interface IJsonObject {
    [key: string]: AnyJson;
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

  export { decode, send, latestBlock };
}
