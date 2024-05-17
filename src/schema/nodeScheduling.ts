export type NodeSchdedulingValue =
  | "global"
  | "global-read"
  | "global-write"
  | "static"
  | "static-read"
  | "static-write"
  | "threadsafe"
  | "topology"
  | "topology-read"
  | "topology-write"
  | "usd"
  | "usd-read"
  | "usd-write"
  | "compute-default"
  | "compute-on-request"
  | "pure";
/**
 * @title NodeScheduling
 * @description NodeScheduling is a type that represents an array of NodeSchdedulingValue.
 * @TJS-examples ["global", "usd"]
 * @TJS-uniqueItems true
 * @example ["global", "usd"]
 */
export type NodeScheduling = NodeSchdedulingValue[];
