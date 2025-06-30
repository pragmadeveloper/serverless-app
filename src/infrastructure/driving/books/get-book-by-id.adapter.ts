import { APIGatewayProxyEventV2 } from "aws-lambda";
import { GetBookById } from "../../../domain/usecases/get-book-by-id.usecase";
import { BookDynamoDBRepository } from "../../driven/repositorys/books/books.dynamo.repository";
import { extractQueryParameters } from "../../../utils/utils";


const bookRespository = new BookDynamoDBRepository()
const getBookByIdUseCase = new GetBookById(bookRespository)

export const getBookByIdHttpAdapter = async (event: APIGatewayProxyEventV2) => {
  try {
    const {id_book} = extractQueryParameters(event)
    const book = await getBookByIdUseCase.invoke(id_book!)
    return book
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message)
  }
}