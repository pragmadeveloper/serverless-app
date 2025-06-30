import { Messages } from "../../constants/messages"
import { IbookRepository } from "../../infrastructure/driven/repositorys/books/books.dynamo.interface"
import { ServiceUnavailableError } from "../../utils/service-unavailable-error"


export class GetAllBooks {

    constructor(private readonly bookRespository: IbookRepository) { }

    async invoke() {
        try {
            const books = await this.bookRespository.getAllBooks()
            return books
        } catch (error: any) {

            if (error.message === Messages.SERVICE_UNAVAILABLE) {
                throw new ServiceUnavailableError(Messages.SERVICE_UNAVAILABLE)
            }

            throw new Error(Messages.UNCONTROLLER_ERROR)
        }
    }
}