import type { Member, Type } from ".";
import { assert } from "../utils";
import { LoggerFactory } from "../utils/Logger";
import { RawObjectType } from "./RawObjectType";

export class ObjectType extends RawObjectType {
	private static readonly logger = LoggerFactory.get("ObjectType");

	private readonly _members: Member[] = [];

	protected constructor(members: Member[]) {
		super();
		members.forEach((member) => this.add(member));
	}

	public override equals<T extends Type>(other: T): boolean {
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

	public override contains<T extends Type>(other: T): boolean {
		if (!(other instanceof ObjectType)) {
			return false;
		}

		return other.members.every((member) => {
			const thisMember = this.members.find((m) => m.name === member.name);
			return thisMember !== undefined && thisMember.mType.contains(member.mType);
		});
	}

	public override toString(): string {
		if (this.members.length === 0) {
			return "{}";
		}
		// TODO: Handle more complex cyclic references
		return `{ ${this.members
			.map((member) => `${member.name}: ${member.mType === this ? "*cyclic reference*" : member.mType}`)
			.join(", ")} }`;
	}

	public override add(member: Member): void {
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

	public override addAll(...members: Member[]): void {
		members.forEach((member) => this.add(member));
	}

	public override hasProperty(name: string): boolean {
		return this.members.some((m) => m.name === name);
	}

	public override getProperty(name: string): Type {
		const member = this.members.find((m) => m.name === name);
		assert(member, `Member with name '${name}' does not exist in object type`);
		return member!.mType;
	}

	public get members(): Member[] {
		return this._members;
	}

	public static override create(members: Member[]): ObjectType {
		return new ObjectType(members);
	}
}
