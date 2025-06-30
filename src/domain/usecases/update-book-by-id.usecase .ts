import { Messages } from "../../constants/messages"
import { IbookRepository } from "../../infrastructure/driven/repositorys/books/books.dynamo.interface"
import { ServiceUnavailableError } from "../../utils/service-unavailable-error"
import { ValidationError } from "../../utils/validation-error"


export class UpdateBookById {

    constructor(private readonly bookRespository: IbookRepository) { }

    async invoke(id:string, data: any) {
        if (!id) {
            throw new ValidationError('Must specify bookId')
        }
        try {
            const book = await this.bookRespository.updateBookById(id,data)
            return book
        } catch (error: any) {
            if (error.message === 'Must specify bookId') {
                throw new ValidationError(error.message)
            }

            if (error.message === Messages.SERVICE_UNAVAILABLE) {
                throw new ServiceUnavailableError(Messages.SERVICE_UNAVAILABLE)
            }

            throw new Error(Messages.UNCONTROLLER_ERROR)
        }
    }
}
