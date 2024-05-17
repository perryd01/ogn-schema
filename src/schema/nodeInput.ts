import {
  ArrayOfPrimitiveTupleType,
  ValueRoleAttributeType,
  MemoryType,
  PrimitiveArrayType,
  PrimitiveTupleType,
  PrimitiveType,
  ArrayValueRoleAttributeType,
  BundleType,
  TargetType,
  AnyType,
  UnionGroupType,
} from "./nodePrimitives";

type NodeInputChoiceType =
  | PrimitiveType
  | PrimitiveArrayType
  | PrimitiveTupleType
  | ArrayOfPrimitiveTupleType
  | ValueRoleAttributeType
  | ArrayValueRoleAttributeType
  | BundleType
  | TargetType
  | AnyType
  | UnionGroupType
  | "token";

/**
 * The top level keyword of the attribute is always the unique name. It is always namespaced within the section it resides and only need be unique within that section. For example, the attribute mesh can appear in both the inputs and outputs sections, where it will be named inputs:mesh and outputs:mesh respectively.
 */
export type NodeInput = {
  /**
   * As with the node, the description field is a multi-line description of the attribute, optionally with reStructuredText formatting. The description should contain enough information for the user to know how that attribute will be used (as an input), computed (as an output), or updated (as state).
   * @example ["This node is part of the OmniGraph node writing examples."]
   * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-description
   */
  description: string;

  /**
   * @title Type
   * @description The type property is one of several hard-coded values that specify what type of data the attribute contains. As we ramp up not all type combinations are supported; run generate_node.py –help to see the currently supported list of attribute types. For a full list of supported types and the data types they generate see Attribute Data Types.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-type
   * @example ["string"]
   * @uniqueItems true
   */
  type: NodeInputChoiceType | NodeInputChoiceType[];

  /**
   * The default property on inputs contains the value of the attribute that will be used when the user has not explicitly set a value or provided an incoming connection to it. For outputs the default value is optional and will only be used when the node compute method cannot be run.
   * The value type of the default property will be the JSON version of the type of data, shown in Attribute Data Types.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-default
   */
  default?: any;

  /**
   * The optional property is used to tell the node whether the attribute’s value needs to be present in order for the compute function to run. If it is set to true then the value is not checked before calling compute. The default value false will not call the compute function if the attribute does not have a valid value.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-optional
   */
  optional?: boolean;

  /**
   * The deprecated property is used to indicate that the attribute is being phased out and should no longer be used. The value of the property is a string or array of strings providing users with information on how they should change their graphs to accommodate the eventual removal of the attribute.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-deprecated
   */
  deprecated?: string | string[];

  /**
   * @title Memory Type
   * @description Node or attribute-level specification of the memory location
   * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-memorytype
   */
  memoryType?: MemoryType;

  /**
   * When specified, these properties represent the minimum and maximum allowable value for the attribute. For arrays the values are applicable to every array element. For tuples the values will themselves be tuples with the same size.
   *
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-range
   */
  mininum?: any;

  /**
   * When specified, these properties represent the minimum and maximum allowable value for the attribute. For arrays the values are applicable to every array element. For tuples the values will themselves be tuples with the same size.
   *
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-range
   */
  maximum?: any;

  /**
   * Attributes can also have key/value style metadata attached to them by adding a dictionary of them using the metadata property. The key and value are any arbitrary string, though it’s a good idea to avoid keywords starting with underscore (_) as they may have special meaning to the graph. Lists of strings can also be used as metadata values, though they will be transformed into a single comma-separated string.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-metadata
   */
  metadata: {
    /**
     * @todo
     */
    allowedTokens?:
      | string[]
      | {
          [key: string]: string;
        };
    /**
     * @todo
     */
    allowMultiInputs?: "1";
    /**
     * @todo
     */
    hidden?: "true";
    /**
     * @todo
     */
    internal?: "true";
    /**
     * @todo
     */
    literalOnly?: "1";
    outputOnly?: "1";

    [key: string]: any; // TODO: Define metadata
  };

  /**
   * uiName is a very common piece of metadata, so as a shortcut it can also be specified as its own keyword at the attribute level. The meaning is the same; associate a piece of metadata with the attribute. This piece of metadata can be used by the UI to present a more human-readable name for the attribute.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-uiname
   */
  uiName?: string;

  /**
   * unvalidated is similar to the optional keyword, in that it is used to tag attributes that may not take part in a compute(). The difference is that these attributes will always exists, they just may not have valid data when the compute is invoked. For such attributes the onus is on the node writer to check validity of such attributes if they do end up being used for the compute.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-unvalidated
   */
  unvalidated?: boolean;
};
