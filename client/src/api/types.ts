export class Task {
	readonly text: string
	readonly tags: string[] = []
	readonly project: string = ''
	readonly priority: string = ''
	readonly note: string = ''
	readonly summary: string = ''
	readonly id: number = NaN

	constructor(text: string) {
		this.text = text
	}
}

export interface NewTask {
	text: string
}