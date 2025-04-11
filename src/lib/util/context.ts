import { getContext, setContext } from 'svelte';

export default class Context<T> {
	private readonly key: string;

	constructor(key: string) {
		this.key = key;
	}

	set(v: T) {
		setContext(this.key, v);
	}

	get(): T {
		return getContext(this.key);
	}
}
