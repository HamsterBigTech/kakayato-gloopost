import Context from '$lib/util/context';
import { BookService } from './service';

export * from './service';
export * from './types';

export const bookCtx = new Context<BookService>('book-service');
