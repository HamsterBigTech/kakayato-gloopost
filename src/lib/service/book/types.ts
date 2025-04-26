export type Book = {
	id: number;
	author: string;
	title: string;
	image: string;
};

export type ViewedBook = Book & {
	willRead: boolean;
};
