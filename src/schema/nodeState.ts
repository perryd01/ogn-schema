export type NodeState = {
  /**
   * The type of the state value.
   */
  type: string;
  /**
   * A description of the state value.
   */
  description: string;
  /**
   * Default value of the state.
   */
  default: any;
  [key: string]: any;
};
