import { PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Messages } from "../../../../constants/messages";
import { CreateBookModel } from "../../../../domain/models/book.model";
import { dynamoClient } from "../../../../utils/dynamodb-client";
import { IbookRepository } from "../../repositorys/books/books.dynamo.interface";
import { v4 as uuidv4 } from 'uuid';

export class BookDynamoDBRepository implements IbookRepository {
  async CreateBookModel({ documentTypeAndNumber, title, description }: {
    documentTypeAndNumber: string
    title: string
    description: string
  }): Promise<CreateBookModel> {
    try {
      const postUuid = uuidv4();
      const params = {
        TableName: 'posts-dynamo-table',
        Item: {
          documentTypeAndNumber,
          postIdentification: postUuid,
          title,
          description,
          createAt: Date.now().toString()
        }
      };
      await dynamoClient.send(new PutCommand(params))

      return {
        documentTypeAndNumber,
        //postIdentification: postUuid,
        title,
        description,
        //createAt: Date.now().toString()
      };
    } catch (error) {
      console.log("create post error: ", error);
      throw new Error(Messages.SERVICE_UNAVAILABLE);
    }
  }

  async getPostsByUser(documentTypeAndNumber: string): Promise<CreateBookModel[]> {
    try {
      const params = {
        TableName: 'posts-dynamo-table',
        KeyConditionExpression: '#documentTypeAndNumber = :documentTypeAndNumber',
        ExpressionAttributeNames: { '#documentTypeAndNumber': 'documentTypeAndNumber' },
        ExpressionAttributeValues: { ':documentTypeAndNumber': documentTypeAndNumber }
      };
      const Items = await dynamoClient.send(new QueryCommand(params));
      if (
        !Items.Items
      ) {
        return [];
      }
      return Items.Items as unknown as CreateBookModel[];
    } catch (error) {
      console.log("get posts error: ", error);
      throw new Error(Messages.SERVICE_UNAVAILABLE);
    }
  }

  async GetAllPosts(): Promise<CreateBookModel[]> {
    try {
      const postsFound = await dynamoClient.send(
        new ScanCommand({
          TableName: "posts-dynamo-table",
        })
      );

      if (!postsFound.Items) {
        return [];
      }
      const posts = postsFound.Items;
      return posts as unknown as CreateBookModel[];
    } catch (error) {
      console.log("getAllposts error: ", error);
      throw new Error(Messages.SERVICE_UNAVAILABLE);
    }
  }


}