// Config
export interface FlowConfig {
  put: (key: string, value: unknown) => FlowConfig;
  get: <T extends unknown>(key: string, defaultValue: T) => T;
  update: <T extends unknown>(key: string, updateFn: (oldValue: T) => T) => FlowConfig;
}
