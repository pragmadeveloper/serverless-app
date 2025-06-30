import { PutCommand, QueryCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ReturnValue } from "@aws-sdk/client-dynamodb";
import { Messages } from "../../../../constants/messages";
import { BookModel } from "../../../../domain/models/book.model";
import { UpdateBookModel } from "../../../../domain/models/update-book.model";
import { dynamoClient } from "../../../../utils/dynamodb-client";
import { IbookRepository } from "../../repositorys/books/books.dynamo.interface";
import { v4 as uuidv4 } from 'uuid';

export class BookDynamoDBRepository implements IbookRepository {


  
  async createBook({ title, author, year }: {title: string,author: string, year: number}): Promise<BookModel> {
    //console.log('ingreso a DB repository');
    try {
      const bookUuid = uuidv4();
      const params = {
        TableName: 'books_table',
        Item: {id_book:bookUuid,title,author,year}

      };
      await dynamoClient.send(new PutCommand(params))

      return {id_book: bookUuid,title,author,year}
      
    } catch (error) {
      console.log("create book error: ", error);
      throw new Error(Messages.SERVICE_UNAVAILABLE);
    }
  }

  async getBookById(bookId: string): Promise<BookModel[]> {
    try {
      const params = {
        TableName: 'books_table',
        KeyConditionExpression: 'id_book = :id_book',
        ExpressionAttributeValues: {':id_book': bookId},
      };
      const Items = await dynamoClient.send(new QueryCommand(params));
      if (
        !Items.Items
      ) {
        return [];
      }
      return Items.Items as unknown as BookModel[];
    } catch (error) {
      console.log("get book error: ", error);
      throw new Error(Messages.SERVICE_UNAVAILABLE);
    }
  }

  async getAllBooks(): Promise<BookModel[]> {
    try {
      const booksFound = await dynamoClient.send(
        new ScanCommand({
          TableName: "books_table",
        })
      );

      if (!booksFound.Items) {
        return [];
      }
      const books = booksFound.Items;
      return books as unknown as BookModel[];
    } catch (error) {
      console.log("getAllBook error: ", error);
      throw new Error(Messages.SERVICE_UNAVAILABLE);
    }
  }

  async updateBookById(id: string, updates: UpdateBookModel): Promise<BookModel> {
    try {
       const { title, author, year } = updates;

      let UpdateExpression = 'set';
      const ExpressionAttributeValues: { [key: string]: any } = {};
      const ExpressionAttributeNames: { [key: string]: string } = {};
      let hasUpdate = false;

      if (title !== undefined) { // Solo si el título se proporciona
        UpdateExpression += ' title = :title,';
        ExpressionAttributeValues[':title'] = title;
        hasUpdate = true;
      }
      if (author !== undefined) { // Solo si el autor se proporciona
        UpdateExpression += ' author = :author,';
        ExpressionAttributeValues[':author'] = author;
        hasUpdate = true;
      }
      if (year !== undefined) { // Solo si el año se proporciona
        // 'year' es una palabra reservada en DynamoDB, así que se necesita ExpressionAttributeNames
        UpdateExpression += ' #yr = :year,';
        ExpressionAttributeValues[':year'] = year;
        ExpressionAttributeNames['#yr'] = 'year'; // Mapea #yr a 'year'
        hasUpdate = true;
      }

      // Elimina la última coma del UpdateExpression si hay actualizaciones
      if (hasUpdate) {
        UpdateExpression = UpdateExpression.slice(0, -1); // Elimina la última coma
      } else {
        // No hay campos para actualizar, lanzar un error o devolver el libro actual
        throw new Error("No se proporcionaron campos para actualizar.");
      }

      const params = {
        TableName: 'books_table',
        Key: { id_book: id },
        UpdateExpression,
        ExpressionAttributeValues,
        ...(Object.keys(ExpressionAttributeNames).length > 0 && { ExpressionAttributeNames }),
        ReturnValues: ReturnValue.ALL_NEW, // Importante para obtener el ítem actualizado
      };
      

      const result = await dynamoClient.send(new UpdateCommand(params));
      return result.Attributes as unknown as BookModel; 
      // const params = {
      //   TableName: 'books_table',
      //   Key: { id_book: id },
      //   UpdateExpression: 'set title = :title, author = :author, #year = :year',
      //   ExpressionAttributeNames: {"#year": "year"},
      //   ExpressionAttributeValues: {
      //     ':title': title,
      //     ':author': author,
      //     ':year': year
      //   },
      // };

      // const result = await dynamoClient.send(new UpdateCommand(params));
      // return result.Attributes as unknown as BookModel;
    } catch (error) {
      console.log("update book error: ", error);
      throw new Error(Messages.SERVICE_UNAVAILABLE);
    }
  }


}