import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { isAfter, addHours } from 'date-fns';


interface IRequest {
    token: string;
    password: string;
}
@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokenRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider

    ) { }

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists')
        }
        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists')
        }

        const tokenCreatAt = userToken.created_at;

        const compareDate = addHours(tokenCreatAt, 2);


        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired')
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);

    }

}

export default ResetPasswordService;