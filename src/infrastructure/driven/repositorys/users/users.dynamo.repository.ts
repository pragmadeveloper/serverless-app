import { PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Messages } from "../../../../constants/messages";
import { dynamoClient } from "../../../../utils/dynamodb-client";
import { v4 as uuidv4 } from 'uuid';
import { IUserRepository } from "./users.dynamo.interface";
import { UserModel } from "../../../../domain/models/user.model";

export class UserDynamoDBRepository implements IUserRepository {

  async createUser({ name, email, gender }: {name:string; email:string; gender:string}): Promise<UserModel> {
    try {
      const bookUuid = uuidv4();
      const params = {
        TableName: 'users_table',
        Item: {id_user:bookUuid,name,email,gender}
      };
      await dynamoClient.send(new PutCommand(params))

      return {id_user: bookUuid,name,email,gender}
      
    } catch (error) {
      console.log("create user error: ", error);
      throw new Error(Messages.SERVICE_UNAVAILABLE);
    }
  }

  async getUserById(userId: string): Promise<UserModel[]> {
    try {
      const params = {
        TableName: 'users_table',
        KeyConditionExpression: 'id_user = :id_user',
        ExpressionAttributeValues: {':id_user': userId},
      };
      const Items = await dynamoClient.send(new QueryCommand(params));
      if (
        !Items.Items
      ) {
        return [];
      }
      return Items.Items as unknown as UserModel[];
    } catch (error) {
      console.log("get user error: ", error);
      throw new Error(Messages.SERVICE_UNAVAILABLE);
    }
  }

  async getAllUsers(): Promise<UserModel[]> {
    try {
      const usersFound = await dynamoClient.send(
        new ScanCommand({
          TableName: "users_table",
        })
      );

      if (!usersFound.Items) return [];
      const users = usersFound.Items;
      return users as unknown as UserModel[];
    } catch (error) {
      console.log("getAllUsers error: ", error);
      throw new Error(Messages.SERVICE_UNAVAILABLE);
    }
  }


}