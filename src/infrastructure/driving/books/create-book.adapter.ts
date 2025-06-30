import { APIGatewayProxyEventV2 } from "aws-lambda";
import { BookDynamoDBRepository } from "../../driven/repositorys/books/books.dynamo.repository";
import { CreateBooktUseCase } from "../../../domain/usecases/create-book.usecase";
import { extractBody } from "../../../utils/utils";

const bookRespository = new BookDynamoDBRepository()
const bookCreateUseCase = new CreateBooktUseCase(bookRespository)

export const createBookHttpAdapter = async (_event: APIGatewayProxyEventV2) => {
  try {
    //console.log('ingreso a adapter');
    const {title,author, year} = extractBody(_event)

    const bookCreated = await bookCreateUseCase.invoke({title,author,year})

    return bookCreated
  
} catch (error: any) {
     console.log('error adapter');
    throw new Error(error.message)
  }
}