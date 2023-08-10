export * from "./Type";

export * from "./PropertyAccessor";

export * from "./AliasType";
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
export * from "./UnknownType";
export * from "./VoidType";

import { isPopulated, populate } from "./populate";

export async function initTypes(): Promise<void> {
	if (!isPopulated()) {
		await populate();
	}
}
