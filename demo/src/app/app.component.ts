import { Component, HostListener } from "@angular/core";
import { MonacoEditorConstructionOptions } from "@materia-ui/ngx-monaco-editor";
import { AppService } from "./app.service";

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

	public code: string = "";

	public stdout = "";
	public stderr = "";
	public ok: boolean | null = null;

	public constructor(private readonly appService: AppService) {}

	@HostListener("document:keypress", ["$event"])
	public handleKeyboardEvent(evt: KeyboardEvent): void {
		if (evt.ctrlKey && (evt.code === "Enter" || evt.code === "NumpadEnter")) {
			evt.preventDefault();
			this.onClick();
		}
	}

	public onClick(): void {
		this.appService.run(this.code).then(({ stdout, stderr, ok }) => {
			this.stdout = stdout;
			this.stderr = stderr;
			this.ok = ok;
		});
	}
}
