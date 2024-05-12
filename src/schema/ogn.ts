type Vec4<T> = [T, T, T, T];

type HEX = `#${string}`;

type IconType =
  | string
  | {
      path: string;
      color: HEX;
      backgroundColor: Vec4<number> | HEX;
      borderColor: Vec4<number> | HEX;
    };

type TokenType =
  | string
  | string[]
  | {
      [key: string]: string;
    };

type PrimtiveType = "bool" | "float" | "integer" | "string";

type MemoryType = "cpu" | "cuda" | "any";

/**
 * The top level keyword of the attribute is always the unique name. It is always namespaced within the section it resides and only need be unique within that section. For example, the attribute mesh can appear in both the inputs and outputs sections, where it will be named inputs:mesh and outputs:mesh respectively.
 */
type NodeInput = {
  /**
   * As with the node, the description field is a multi-line description of the attribute, optionally with reStructuredText formatting. The description should contain enough information for the user to know how that attribute will be used (as an input), computed (as an output), or updated (as state).
   * @example
   * [
   *        "This node is part of the OmniGraph node writing examples.",
   *        "It is structured to include node and attribute information illustrating the .ogn format"
   *    ]
   *
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-description
   */
  description: string;

  /**
   * The type property is one of several hard-coded values that specify what type of data the attribute contains. As we ramp up not all type combinations are supported; run generate_node.py –help to see the currently supported list of attribute types. For a full list of supported types and the data types they generate see Attribute Data Types.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-type
   */
  type: PrimtiveType;

  /**
   * The default property on inputs contains the value of the attribute that will be used when the user has not explicitly set a value or provided an incoming connection to it. For outputs the default value is optional and will only be used when the node compute method cannot be run.
   * The value type of the default property will be the JSON version of the type of data, shown in Attribute Data Types.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-default
   */
  default: any;

  /**
   * The optional property is used to tell the node whether the attribute’s value needs to be present in order for the compute function to run. If it is set to true then the value is not checked before calling compute. The default value false will not call the compute function if the attribute does not have a valid value.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-optional
   */
  optional: boolean;

  /**
   * The deprecated property is used to indicate that the attribute is being phased out and should no longer be used. The value of the property is a string or array of strings providing users with information on how they should change their graphs to accommodate the eventual removal of the attribute.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-deprecated
   */
  deprecated: string | string[];

  /**
   * By default every attribute in a node will use the memoryType defined at the node level. It’s possible for attributes to override that choice by adding that same keyword in the attribute properties.
   * Here’s an example of an attribute that overrides the node level memory type to force the attribute onto the CPU. You might do this to keep cheap POD values on the CPU while the expensive data arrays go directly to the GPU.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-memorytype
   */
  memoryType: MemoryType;

  /**
   * When specified, these properties represent the minimum and maximum allowable value for the attribute. For arrays the values are applicable to every array element. For tuples the values will themselves be tuples with the same size.
   *
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-range
   */
  mininum: any;

  /**
   * When specified, these properties represent the minimum and maximum allowable value for the attribute. For arrays the values are applicable to every array element. For tuples the values will themselves be tuples with the same size.
   *
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-range
   */
  maximum: any;

  /**
   * Attributes can also have key/value style metadata attached to them by adding a dictionary of them using the metadata property. The key and value are any arbitrary string, though it’s a good idea to avoid keywords starting with underscore (_) as they may have special meaning to the graph. Lists of strings can also be used as metadata values, though they will be transformed into a single comma-separated string.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-metadata
   */
  metadata: {
    /**
     * @todo
     * @TJS-type string
     */
    allowedTokens: any;
    /**
     * @todo
     */
    allowMultiInputs: any;
    /**
     * @todo
     */
    hidden: any;
    /**
     * @todo
     */
    internal: any;

    [key: string]: any; // TODO: Define metadata
  };

  /**
   * uiName is a very common piece of metadata, so as a shortcut it can also be specified as its own keyword at the attribute level. The meaning is the same; associate a piece of metadata with the attribute. This piece of metadata can be used by the UI to present a more human-readable name for the attribute.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-uiname
   */
  uiName: string;

  /**
   * unvalidated is similar to the optional keyword, in that it is used to tag attributes that may not take part in a compute(). The difference is that these attributes will always exists, they just may not have valid data when the compute is invoked. For such attributes the onus is on the node writer to check validity of such attributes if they do end up being used for the compute.
   * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-unvalidated
   */
  unvalidated?: boolean;
};

type NodeExclude =
  | "c++"
  | "docs"
  | "icon"
  | "python"
  | "template"
  | "tests"
  | "usd";

type OGN = {
  [key: string]: {
    $comment?: string;
    /**
     * The description key value is required on all nodes and will be used in the generated documentation of the node. You can embed reStructuredText code in the string to be rendered in the final node documentation, though it will appear as-is in internal documentation such as Python docstrings.
     * The value can be a string or a list of strings. If it is a list, they will be concatenated as appropriate in the locations they are used. (Linefeeds preserved in Python docstrings, turned into a single space for text documentation, prepended with comment directives in code…)
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-description
     */
    description: string | string[];

    /**
     * A string value that represents the path, relative to the .ogn file, of the icon file that represents the node. This icon should be a square SVG file. If not specified then it will default to the file with the same name as the .ogn file with the .svg extension (e.g. OgnMyNode.ogn looks for the file OgnMyNode.svg). When no icon file exists the UI can choose a default for it. The icon will be installed into the extension’s generated ogn/ directory
     *
     * The extended syntax for the icon description adds the ability to specify custom coloring. Instead of just a string path, the icon is represented by a dictionary of icon properties. Allowed values are “path”, the icon location as with the simple syntax, “color”, a color representation for the draw part of the icon’s shape, “backgroundColor”, a color representation for the part of the icon not containing its shape, and “borderColor”, a color representation for the outline of the icon.
     *
     * Colors are represented in one of two ways - as hexadecimal in the form #AABBGGRR, or as a decimal list of [R, G, B, A], both using the value range [0, 255].
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-icon
     */
    icon: IconType;

    /**
     * The integer value version defines the version number of the current node definition. It is up to the node writer how to manage the encoding of version levels in the integer value. (For example a node might encode a major version of 3, a minor version of 6, and a patch version of 12 in two digit groups as the integer 30612, or it might simply use monotonic increasing values for versions 1, 2, 3…)
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-version
     * @minimum 1
     * @default 1
     */
    version: number;

    /**
     * A string value that represents the language of implementation. The default when not specified is “c++”. The other legal value is “python”. This value indicates the language in which the node compute algorithm is written.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-language
     */
    language: "python" | "c++";

    /**
     * By default every attribute in a node will use the memoryType defined at the node level. It’s possible for attributes to override that choice by adding that same keyword in the attribute properties.
     *
     * Here’s an example of an attribute that overrides the node level memory type to force the attribute onto the CPU. You might do this to keep cheap POD values on the CPU while the expensive data arrays go directly to the GPU.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-memorytype
     */
    memoryType: MemoryType;

    /**
     * Some node types will not be interested in all generated files, e.g. if the node is a Python node it will not need the C++ interface. Any of the generated files can be skipped by including it in a list of strings whose key is exclude. Here is a node which excludes all generated output, something you might do if you are developing the description of a new node and just want the node syntax to validate without generating code.
     *
     * Legal values to include in the exclusion list are “c++”, “docs”, “icon”, “python”, “template”, “tests”, or “usd”, in any combination.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-exclude
     */
    exclude: NodeExclude[];

    /**
     * Categories provide a way to group similar node types, mostly so that they can be managed easier in the UI.
     * For a more detailed example see the Node Categories “how-to”.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-categories
     */
    categories: string[] | string;

    /**
     * Usually when the memory type is set to cuda or any the CUDA memory pointers for array types are returned as a GPU pointer to GPU data, so when passing the data to CUDA code you have to pass pointers-to-pointers, since the CPU code cannot dereference them. Sometimes it is more efficient to just pass the GPU pointer directly though, pointed at by a CPU pointer. (It’s still a pointer to allow for null values.) You can do this by specifying “cpu” as your cudaPointers property.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-cudapointers
     */
    cudaPointers: "cuda" | "cpu";

    /**
     * Node types can have key/value style metadata attached to them by adding a dictionary of them using the metadata property. The key and value are any arbitrary string, though it’s a good idea to avoid keywords starting with with underscore (_) as they may have special meaning to the graph. Lists of strings can also be used as metadata values, though they will be transformed into a single comma-separated string.
     * A simple example of useful metadata is a human readable format for your node type name. UI code can then read the consistently named metadata to provide a better name in any interface requiring node type selection. In the example the keyword author is used.
     * There are several hardcoded metadata values, described in this guide. The keywords under which these are stored are available as constants for consistency, and can be found in Python in the og.MetadataKeys object and in C++ in the file omni/graph/core/ogn/Database.h.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-metadata
     */
    metadata: {
      author: string;
      [key: string]: any; // TODO: Define metadata
    };

    /**
     * A string or list of string values that represent information for the scheduler on how nodes of this type may be safely scheduled. The string values are fixed, and say specific things about the kind of data the node access when computing.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-scheduling
     */
    scheduling: string | string[];

    /**
     * singleton is metadata with special meaning to the node type, so as a shortcut it can also be specified as its own keyword at the node level. The meaning is the same; associate a piece of metadata with the node type. This piece of metadata indicates the quality of the node type of only being able to instantiate a single node of that type in a graph or its child graphs. The value is specified as a boolean, though it is stored as the string “1”. (If the boolean is false then nothing is stored, as that is the default.)
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-singleton
     */
    singleton: boolean;

    /**
     * tags is a very common piece of metadata, so as a shortcut it can also be specified as its own keyword at the node level. The meaning is the same; associate a piece of metadata with the node type. This piece of metadata can be used by the UI to better organize sets of nodes into common groups.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-tags
     */
    tags: string | string[];

    /**
     * Token types are more efficient than string types for comparison, and are fairly common. For that reason the .ogn file provides this shortcut to predefine some tokens for use in your node implementation code.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-tokens
     */
    tokens: TokenType;

    /**
     * uiName is a very common piece of metadata, so as a shortcut it can also be specified as its own keyword at the node level. The meaning is the same; associate a piece of metadata with the node type. This piece of metadata can be used by the UI to present a more human-readable name for the node type.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-uiname
     * @minLength 2
     */
    uiName: string;
    inputs: {
      [key: string]: NodeInput;
    };
    outputs: {
      [key: string]: any;
    };

    state: any;

    tests: any[];
  };
};
