import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class AppService {
	public constructor() {}

	public run(content: string): void {
		// @ts-ignore
		import("../../../src/main");
	}
}
