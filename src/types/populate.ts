import {
	AnyType,
	ArrayType,
	BigIntType,
	BooleanType,
	FunctionType,
	NumberType,
	ObjectType,
	Property,
	RawObjectType,
	StringType,
} from ".";

function getCommonBuiltins(): Property[] {
	return [
		{
			name: "__proto__",
			pType: AnyType.create(),
		},
		{
			name: "constructor",
			pType: AnyType.create(),
		},
		{
			name: "hasOwnProperty",
			pType: FunctionType.create([StringType.create()], BooleanType.create()),
		},
		{
			name: "toString",
			pType: FunctionType.create([], StringType.create()),
		},
	];
}

function populateArrayType(): void {
	ArrayType.setBuiltins([
		...getCommonBuiltins(),
		{
			name: "length",
			pType: NumberType.create(),
		},
	]);
}

function populateBigIntType(): void {
	BigIntType.setBuiltins([...getCommonBuiltins()]);
}

function populateBooleanType(): void {
	BooleanType.setBuiltins([...getCommonBuiltins()]);
}

function populateFunctionType(): void {
	FunctionType.setBuiltins([...getCommonBuiltins()]);
}

function populateNumberType(): void {
	NumberType.setBuiltins([...getCommonBuiltins()]);
}

function populateObjectType(): void {
	ObjectType.setBuiltins([...getCommonBuiltins()]);
}

function populateRawObjectType(): void {
	RawObjectType.setBuiltins([...getCommonBuiltins()]);
}

function populateStringType(): void {
	StringType.setBuiltins([...getCommonBuiltins()]);
}

export function populate(): void {
	populateArrayType();
	populateBigIntType();
	populateBooleanType();
	populateFunctionType();
	populateNumberType();
	populateObjectType();
	populateRawObjectType();
	populateStringType();
	populated = true;
}

let populated = false;

export function isPopulated(): boolean {
	return populated;
}
