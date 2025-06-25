import { CreateBookModel } from "../../../../domain/models/book.model";


export interface IbookRepository {
    createBook({documentTypeAndNumber,title,description}: 
      {
        documentTypeAndNumber: string
        title: string
        description: string
      }): Promise<CreateBookModel>
    getPostsByUser(userId: string): Promise<CreateBookModel[]>
    GetAllPosts(): Promise<CreateBookModel[]>
}