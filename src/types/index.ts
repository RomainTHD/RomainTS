export * from "./Type";

export * from "./PropertyAccessor";

export * from "./AnyType";
export * from "./ArrayType";
export * from "./BigIntType";
export * from "./BooleanType";
export * from "./FunctionType";
export * from "./LiteralType";
export * from "./NeverType";
export * from "./NullType";
export * from "./NumberType";
export * from "./ObjectType";
export * from "./RawObjectType";
export * from "./StringType";
export * from "./UndefinedType";
export * from "./UnionType";
export * from "./VoidType";

import { isPopulated, populate } from "./populate";

if (!isPopulated()) {
	populate();
}
