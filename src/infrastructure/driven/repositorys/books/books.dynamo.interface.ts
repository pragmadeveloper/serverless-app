import { BookModel } from "../../../../domain/models/book.model";


export interface IbookRepository {
    createBook({title, author, year}: {title: string, author: string, year: number}): Promise<BookModel>
    getBookById(id: string): Promise<BookModel[]>
    getAllBooks(): Promise<BookModel[]>
    updateBookById(id: string, {title, author, year}: {title: string, author: string, year: number}): Promise<BookModel>
}