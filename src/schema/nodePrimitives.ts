export type PrimitiveType =
  | "bool"
  | "double"
  | "int"
  | "int64"
  | "path"
  | "uchar"
  | "uint"
  | "uint64"
  | "token"
  | "half"
  | "float"
  | "integer"
  | "string";

type ArrayablePrimitiveType =
  | "bool"
  | "double"
  | "float"
  | "half"
  | "int"
  | "int64"
  | "token"
  | "uchar"
  | "uint"
  | "uint64";

type ImplPrimitiveArrayType<T extends ArrayablePrimitiveType> = `${T}[]`;
export type PrimitiveArrayType = ImplPrimitiveArrayType<ArrayablePrimitiveType>;

type TupleablePrimitiveType = "double" | "float" | "half" | "int";
type TupleablePrimitiveTypeSize = 2 | 3 | 4;
type ImplPrimitiveTupleType<
  T extends TupleablePrimitiveType,
  X extends TupleablePrimitiveTypeSize
> = `${T}[${X}]`;

export type PrimitiveTupleType = ImplPrimitiveTupleType<
  TupleablePrimitiveType,
  TupleablePrimitiveTypeSize
>;

type ImplArrayOfPrimitiveTupleType<
  T extends TupleablePrimitiveType,
  X extends TupleablePrimitiveTypeSize
> = `${T}[${X}][]`;

export type ArrayOfPrimitiveTupleType = ImplArrayOfPrimitiveTupleType<
  TupleablePrimitiveType,
  TupleablePrimitiveTypeSize
>;

type ColorValueRoleAttribute<
  T extends FloatTypes,
  S extends 3 | 4
> = `color${T}[${S}]`;

type FloatTypes = "d" | "f" | "h";

type MatrixDValueRoleAttribute<S extends number> = `matrixd[${S}]`;
type NormalValueRoleAttribute<T extends FloatTypes> = `normal${T}[3]`;
type VectorValueRoleAttribute<T extends FloatTypes> = `vector${T}[3]`;
type TextCordValueRoleAttribute<
  T extends FloatTypes,
  S extends 2 | 3
> = `texcoord${T}[${S}]`;
type QuaternionValueRoleAttribute<T extends FloatTypes> = `quat${T}[4]`;
type CartesianPointValueRoleAttribute<T extends FloatTypes> = `point${T}[3]`;

export type NumericValueRoleAttributeType =
  | ColorValueRoleAttribute<FloatTypes, 3 | 4>
  | MatrixDValueRoleAttribute<2 | 3 | 4>
  | NormalValueRoleAttribute<FloatTypes>
  | VectorValueRoleAttribute<FloatTypes>
  | TextCordValueRoleAttribute<FloatTypes, 2 | 3>
  | QuaternionValueRoleAttribute<FloatTypes>
  | CartesianPointValueRoleAttribute<FloatTypes>
  | "frame[4]";

export type ValueRoleAttributeType =
  | NumericValueRoleAttributeType
  | "execute"
  | "objectId"
  | "timecode";

export type ArrayValueRoleAttributeType = `${Exclude<
  ValueRoleAttributeType,
  "execute"
>}[]`;

export type BundleType = "bundle";
export type TargetType = "target";
export type AnyType = "any";

type TypesUnionGroupType = "scalers" | "tuples" | "array_elements" | "arrays";
type IntegralUnionGroupType<T extends TypesUnionGroupType> =
  | `integral_${T}`
  | "integrals";
type DecimalUnionGroupType<T extends TypesUnionGroupType> =
  | `decimal_${T}`
  | "decimals";
type NumericUnionGroupType<T extends TypesUnionGroupType> =
  | `numeric_${T}`
  | "numerics";

export type UnionGroupType =
  | IntegralUnionGroupType<TypesUnionGroupType>
  | "matrices"
  | DecimalUnionGroupType<TypesUnionGroupType>
  | NumericUnionGroupType<TypesUnionGroupType>
  | "array_elements"
  | "arrays"
  | "strings";

export type MemoryType = "cpu" | "cuda" | "any";
export type Vec4<T> = [T, T, T, T];
/**
 * @pattern ^#[0-9a-fA-F]{8}$
 */
export type HEX = string;
export type NodeLanguage = "c++" | "python";
