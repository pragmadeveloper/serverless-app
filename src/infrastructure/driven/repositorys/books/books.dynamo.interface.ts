import { BookModel } from "../../../../domain/models/book.model";


export interface IbookRepository {
    createBook({title, autor, year}: {title: string, autor: string, year: number}): Promise<BookModel>
    getBookById(id: string): Promise<BookModel[]>
    getAllBook(): Promise<BookModel[]>
}