export class Task {
	readonly tags: string[] = []
	readonly project: string = ''
	readonly priority: string = ''
	readonly note: string = ''
	readonly summary: string
	readonly id: number = NaN

	constructor(summary: string) {
		this.summary = summary
	}
}