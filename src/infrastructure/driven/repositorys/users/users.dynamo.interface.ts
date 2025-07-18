import { UserModel } from "../../../../domain/models/user.model";


export interface IUserRepository {
    createUser({name, email, gender}: {name: string, email: string, gender: string}): Promise<UserModel>
    getUserById(id: string): Promise<UserModel[]>
    getAllUsers(): Promise<UserModel[]>
}