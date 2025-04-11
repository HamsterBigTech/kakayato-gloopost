import { getContext, setContext } from 'svelte';

export type Inner<T> = { val: T | null };

export default class Context<T> {
	private readonly key: string;

	constructor(key: string) {
		this.key = key;
	}

	set(v: Inner<T>) {
		setContext(this.key, v);
	}

	get(): Inner<T> {
		return getContext<Inner<T>>(this.key);
	}
}
