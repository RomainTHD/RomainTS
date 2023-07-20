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

const commonBuiltins: Property[] = [
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

function populateArrayType(): void {
	ArrayType.setBuiltins([
		...commonBuiltins,
		{
			name: "length",
			pType: NumberType.create(),
		},
	]);
}

function populateBigIntType(): void {
	BigIntType.setBuiltins([...commonBuiltins]);
}

function populateBooleanType(): void {
	BooleanType.setBuiltins([...commonBuiltins]);
}

function populateFunctionType(): void {
	FunctionType.setBuiltins([...commonBuiltins]);
}

function populateNumberType(): void {
	NumberType.setBuiltins([...commonBuiltins]);
}

function populateObjectType(): void {
	ObjectType.setBuiltins([...commonBuiltins]);
}

function populateRawObjectType(): void {
	RawObjectType.setBuiltins([...commonBuiltins]);
}

function populateStringType(): void {
	StringType.setBuiltins([...commonBuiltins]);
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
