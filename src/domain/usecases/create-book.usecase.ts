import { CreateBookModel } from './../models/create-book.model';
import { Messages } from '../../constants/messages';
import { ServiceUnavailableError } from '../../utils/service-unavailable-error';
import { ValidationError } from '../../utils/validation-error';
import { IbookRepository } from '../../infrastructure/driven/repositorys/books/books.dynamo.interface';


export class CreateBooktUseCase {

  constructor (private readonly bookRespository: IbookRepository) {}

  async invoke (book: CreateBookModel) {

    try {

      const newbook = await this.bookRespository.createBook(book)

      return newbook

    } catch (error: any) {
      if (error.message === 'Must specify required data') {
        throw new ValidationError(error.message)
      }

      if (error.message === Messages.SERVICE_UNAVAILABLE) {
        throw new ServiceUnavailableError(Messages.SERVICE_UNAVAILABLE)
      }

      throw new Error(Messages.UNCONTROLLER_ERROR)
    }
  }
}