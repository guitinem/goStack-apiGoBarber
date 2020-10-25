import UserToken from '../infra/typeorm/entities/UsersToken';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
