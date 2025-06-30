import { APIGatewayProxyEventV2 } from "aws-lambda";
import { UpdateBookById } from "../../../domain/usecases/update-book-by-id.usecase ";
import { BookDynamoDBRepository } from "../../driven/repositorys/books/books.dynamo.repository";
import { extractQueryParameters,extractBody } from "../../../utils/utils";


const bookRespository = new BookDynamoDBRepository()
const updateBookByIdUseCase = new UpdateBookById(bookRespository)

export const updateBookByIdHttpAdapter = async (event: APIGatewayProxyEventV2) => {
  try {
    const {id_book} = extractQueryParameters(event)
    const {title,author, year} = extractBody(event)
     const data = {title,author, year}
    const book = await updateBookByIdUseCase.invoke(id_book!,data)
    return book
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message)
  }
}