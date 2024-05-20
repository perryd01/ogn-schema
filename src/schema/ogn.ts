import { NodeExclude } from "./nodeExclude";
import { IconType } from "./nodeIcon";
import { NodeInput } from "./nodeInput";
import { NodeOutput } from "./nodeOutput";
import { MemoryType, NodeLanguage } from "./nodePrimitives";
import { NodeScheduling } from "./nodeScheduling";
import { NodeState } from "./nodeState";
import { NodeTest } from "./nodeTest";
import { TokenType } from "./nodeToken";

/**
 * @items.minimum 1
 */
export type OGN = {
  [key: string]: {
    /**
     * @title Comment
     * @description JSON files do not have a syntax for adding comments, however in order to allow for adding descriptions or disabled values to a .ogn file the leading character “$” will treat the key in any key/value pair as a comment.
     * @TJS-examples ["This node is like a box of chocolates - you never know what you're gonna get"]
     * @example ["This node is like a box of chocolates - you never know what you're gonna get"]
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#comments
     */
    $comment?: string;

    /**
     * @title NodeDescription
     * @description You can embed reStructuredText code in the string to be rendered in the final node documentation, though it will appear as-is in internal documentation such as Python docstrings.
     * The value can be a string or a list of strings. If it is a list, they will be concatenated as appropriate in the locations they are used. (Linefeeds preserved in Python docstrings, turned into a single space for text documentation, prepended with comment directives in code…)
     * @example
     * ```json
     * "description": "This node is part of the OmniGraph node writing examples."
     * ```
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-description
     */
    description: string | string[];

    /**
     * @title NodeIcon
     * @description Single string path or dictionary of detailed information to override icon appearance
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-icon
     */
    icon?: IconType;

    /**
     * @title NodeVersion
     * @description The integer value version defines the version number of the current node definition. It is up to the node writer how to manage the encoding of version levels in the integer value. (For example a node might encode a major version of 3, a minor version of 6, and a patch version of 12 in two digit groups as the integer 30612, or it might simply use monotonic increasing values for versions 1, 2, 3…)
     * @minimum 1
     * @default 1
     * @asType integer
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-version
     */
    version: number;

    /**
     * @title NodeLanguage
     * @description A string value that represents the language of implementation. The default when not specified is “c++”. The other legal value is “python”. This value indicates the language in which the node compute algorithm is written.
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-language
     */
    language: NodeLanguage;

    /**
     * @title MemoryType
     * @description Node or attribute-level specification of the memory location
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-attribute-memorytype
     */
    memoryType?: MemoryType;

    /**
     * @title Exclude
     * @description Some node types will not be interested in all generated files, e.g. if the node is a Python node it will not need the C++ interface. Any of the generated files can be skipped by including it in a list of strings whose key is exclude. Here is a node which excludes all generated output, something you might do if you are developing the description of a new node and just want the node syntax to validate without generating code.
     *
     * Legal values to include in the exclusion list are “c++”, “docs”, “icon”, “python”, “template”, “tests”, or “usd”, in any combination.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-exclude
     */
    exclude?: NodeExclude[];

    /**
     * @title NodeCategories
     * @description Categories provide a way to group similar node types, mostly so that they can be managed easier in the UI.
     * @TJS-uniqueItems true
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-categories
     */
    categories: string[] | string | { [key: string]: string };

    /**
     * Usually when the memory type is set to cuda or any the CUDA memory pointers for array types are returned as a GPU pointer to GPU data, so when passing the data to CUDA code you have to pass pointers-to-pointers, since the CPU code cannot dereference them. Sometimes it is more efficient to just pass the GPU pointer directly though, pointed at by a CPU pointer. (It’s still a pointer to allow for null values.) You can do this by specifying “cpu” as your cudaPointers property.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-cudapointers
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-cudapointers
     */
    cudaPointers?: "cuda" | "cpu";

    /**
     * Node types can have key/value style metadata attached to them by adding a dictionary of them using the metadata property. The key and value are any arbitrary string, though it’s a good idea to avoid keywords starting with with underscore (_) as they may have special meaning to the graph. Lists of strings can also be used as metadata values, though they will be transformed into a single comma-separated string.
     * A simple example of useful metadata is a human readable format for your node type name. UI code can then read the consistently named metadata to provide a better name in any interface requiring node type selection. In the example the keyword author is used.
     * There are several hardcoded metadata values, described in this guide. The keywords under which these are stored are available as constants for consistency, and can be found in Python in the og.MetadataKeys object and in C++ in the file omni/graph/core/ogn/Database.h.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-metadata
     */
    metadata: {
      author?: string;
      [key: string]: any; // TODO: Define metadata
    };

    /**
     * @title Scheduling
     * @description A string or list of string values that represent information for the scheduler on how nodes of this type may be safely scheduled. The string values are fixed, and say specific things about the kind of data the node access when computing.
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-scheduling
     */
    scheduling?: NodeScheduling;

    /**
     * singleton is metadata with special meaning to the node type, so as a shortcut it can also be specified as its own keyword at the node level. The meaning is the same; associate a piece of metadata with the node type. This piece of metadata indicates the quality of the node type of only being able to instantiate a single node of that type in a graph or its child graphs. The value is specified as a boolean, though it is stored as the string “1”. (If the boolean is false then nothing is stored, as that is the default.)
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-singleton
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-singleton
     */
    singleton?: boolean;

    /**
     * tags is a very common piece of metadata, so as a shortcut it can also be specified as its own keyword at the node level. The meaning is the same; associate a piece of metadata with the node type. This piece of metadata can be used by the UI to better organize sets of nodes into common groups.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-tags
     * @example "fruit,example,chocolate"
     * @example ["fruit", "example", "chocolate"]
     * @example "fruit"
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-tags
     */
    tags?: string | string[];

    /**
     * Token types are more efficient than string types for comparison, and are fairly common. For that reason the .ogn file provides this shortcut to predefine some tokens for use in your node implementation code.
     * https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-tokens
     * @example "apple"
     * @example ["apple", "banana", "cherry"]
     * @example { "apple": "Granny Smith", "pear": "Bosc Pear", "orange": "Florida Navel Orange"}
     * {@link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-tokens}
     */
    tokens?: TokenType;

    /**
     * @title UI Name
     * @description uiName is a very common piece of metadata, so as a shortcut it can also be specified as its own keyword at the node level. The meaning is the same; associate a piece of metadata with the node type. This piece of metadata can be used by the UI to present a more human-readable name for the node type.
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#ogn-keyword-node-uiname
     * @example "OmniGraph Example Node"
     */
    uiName: string;
    /**
     * Attributes that are read-only within the node’s compute function. These form the collection of data used to run the node’s computation algorithm.
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#attribute-dictionaries
     */
    inputs?: {
      [key: string]: NodeInput;
    };
    /**
     * Attributes whose values are generated as part of the computation algorithm. Until the node computes their values they will be undefined. This data is passed on to other nodes in the graph, or made available for inspection.
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#attribute-dictionaries
     */
    outputs?: {
      [key: string]: NodeOutput;
    };

    /**
     * Attributes that persist between one evaluation and the next. They are both readable and writable. The primary difference between state attributes and output attributes is that when you set the value on a state attribute that value is guaranteed to be there the next time the node computes. Its data is entirely owned by the node.
     * @link https://docs.omniverse.nvidia.com/kit/docs/omni.graph.docs/latest/dev/ogn/ogn_reference_guide.html#attribute-dictionaries
     */
    state?: {
      [key: string]: NodeState;
    };

    /**
     * Tests consist of a list of objects containing either direct values for input and output attributes, or a file path to an external test scene followed by a list of objects containing the expected output and state values to check for a user-specified node (as long as it exists in the test scene)
     */
    tests?: NodeTest[];
  };
};
