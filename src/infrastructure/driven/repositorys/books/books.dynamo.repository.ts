import { PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Messages } from "../../../../constants/messages";
import { BookModel } from "../../../../domain/models/book.model";
import { dynamoClient } from "../../../../utils/dynamodb-client";
import { IbookRepository } from "../../repositorys/books/books.dynamo.interface";
import { v4 as uuidv4 } from 'uuid';

export class BookDynamoDBRepository implements IbookRepository {

  async createBook({ title, autor, year }: {title: string,autor: string, year: number}): Promise<BookModel> {
    
    try {
      const bookUuid = uuidv4();
      const params = {
        TableName: 'book-dynamo-table',
        Item: {
          bookIdentification: bookUuid,
          title,
          autor,
          year
        }
      };
      await dynamoClient.send(new PutCommand(params))

      return {id: bookUuid,title,autor,year}
      
    } catch (error) {
      console.log("create book error: ", error);
      throw new Error(Messages.SERVICE_UNAVAILABLE);
    }
  }

  async getBookById(bookId: string): Promise<BookModel[]> {
    try {
      const params = {
        TableName: 'book-dynamo-table',
        KeyConditionExpression: '#bookId = :bookId',
        ExpressionAttributeNames: {'#bookId': bookId},
      };
      const Items = await dynamoClient.send(new QueryCommand(params));
      if (
        !Items.Items
      ) {
        return [];
      }
      return Items.Items as unknown as BookModel[];
    } catch (error) {
      console.log("get posts error: ", error);
      throw new Error(Messages.SERVICE_UNAVAILABLE);
    }
  }

  async getAllBook(): Promise<BookModel[]> {
    try {
      const booksFound = await dynamoClient.send(
        new ScanCommand({
          TableName: "posts-dynamo-table",
        })
      );

      if (!booksFound.Items) {
        return [];
      }
      const books = booksFound.Items;
      return books as unknown as BookModel[];
    } catch (error) {
      console.log("getAllposts error: ", error);
      throw new Error(Messages.SERVICE_UNAVAILABLE);
    }
  }


}