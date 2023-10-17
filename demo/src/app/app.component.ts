import { Component, HostListener } from "@angular/core";
import type { MonacoEditorConstructionOptions } from "@materia-ui/ngx-monaco-editor";
import { AppService } from "./app.service";
import type { LogEntry } from "./LogEntry";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	public readonly editorOptions: MonacoEditorConstructionOptions = {
		theme: "vs-dark",
		language: "typescript",
		scrollbar: {
			vertical: "hidden",
			horizontal: "hidden",
			handleMouseWheel: false,
		},
	};

	public code = "";

	public output: LogEntry[] = [];
	public status: "none" | "running" | "success" | "failure" = "none";

	public constructor(private readonly appService: AppService) {}

	@HostListener("document:keypress", ["$event"])
	public handleKeyboardEvent(evt: KeyboardEvent): void {
		if (evt.ctrlKey && (evt.code === "Enter" || evt.code === "NumpadEnter")) {
			evt.preventDefault();
			this.onClick();
		}
	}

	public onClick(): void {
		this.status = "running";
		this.appService.run(this.code).then(({ output, ok }) => {
			this.output = output;
			this.status = ok ? "success" : "failure";
		});
	}
}
