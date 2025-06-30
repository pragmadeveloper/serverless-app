import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { GetAllBooks } from '../../../domain/usecases/get-all-books.usecase'
import { BookDynamoDBRepository } from '../../driven/repositorys/books/books.dynamo.repository'

const bookRepository = new BookDynamoDBRepository()
const getAllBooksUseCase = new GetAllBooks(bookRepository)

export const getAllBooksHttpAdapter = async (_event: APIGatewayProxyEventV2) => {
  try {
    const booksFound = await getAllBooksUseCase.invoke()
    return booksFound
  } catch (error: any) {
    throw new Error(error.message)
  }
}