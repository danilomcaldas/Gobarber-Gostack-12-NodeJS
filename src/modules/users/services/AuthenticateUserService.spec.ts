import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUsersService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUsersService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUsersService(fakeUserRepository, fakeHashProvider);
        authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
    })
    it('should be able to authenticate', async () => {
        const user = await createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);

    });

    it('should not be able to authenticate with non existing user', async () => {

        await expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456',
        }),
        ).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to authenticate with wrong password', async () => {

        await createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        await expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: 'wrong-passoword',
        }),
        ).rejects.toBeInstanceOf(AppError);


    });


});