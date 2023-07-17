import { assert } from "../utils";
import { LoggerFactory } from "../utils/Logger";
import { Type } from "./Type";

type Member = { mType: Type; name: string };

export class ObjectType implements Type {
	private static readonly logger = LoggerFactory.get("ObjectType");

	private readonly _members: Member[] = [];

	private constructor(members: Member[]) {
		members.forEach((member) => this.add(member));
	}

	public equals<T extends Type>(other: T): boolean {
		if (!(other instanceof ObjectType)) {
			return false;
		}

		return (
			this.members.length === other.members.length &&
			this.members.every((member) => {
				const thisMember = other.members.find((m) => m.name === member.name);
				return thisMember !== undefined && thisMember.mType.equals(member.mType);
			})
		);
	}

	public contains<T extends Type>(other: T): boolean {
		if (!(other instanceof ObjectType)) {
			return false;
		}

		return other.members.every((member) => {
			const thisMember = this.members.find((m) => m.name === member.name);
			return thisMember !== undefined && thisMember.mType.contains(member.mType);
		});
	}

	public toString(): string {
		if (this.members.length === 0) {
			return "{}";
		}
		return `{ ${this.members.map((member) => `${member.name}: ${member.mType}`).join(", ")} }`;
	}

	public add(member: Member): void {
		assert(member, "Invalid member");
		assert(member.name, `Invalid member name, is '${member.name}'`);
		assert(member.mType, `Invalid member type, is '${member.mType}'`);

		if (this.members.some((m) => m.name === member.name)) {
			ObjectType.logger.warn(
				`Member with name '${member.name}' already exists in object type, will be overwritten.`,
			);
			this._members[this._members.findIndex((m) => m.name === member.name)] = member;
		} else {
			this._members.push(member);
		}
	}

	public addAll(...members: Member[]): void {
		members.forEach((member) => this.add(member));
	}

	public get members(): Member[] {
		return this._members;
	}

	public static get(members: Member[]): ObjectType {
		return new ObjectType(members);
	}
}
