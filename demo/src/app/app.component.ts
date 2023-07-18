import { Component, ElementRef, ViewChild } from "@angular/core";
import { AppService } from "./app.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	@ViewChild("textArea")
	public textArea: ElementRef<HTMLTextAreaElement>;

	public constructor(private readonly appService: AppService) {}

	public onClick(): void {
		this.appService.run(this.textArea.nativeElement.value);
	}
}
