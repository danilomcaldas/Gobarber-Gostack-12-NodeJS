import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';


let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokenRepository,
            fakeHashProvider
        );

    });
    it('should be able to to reset the password', async () => {

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345'
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPassword.execute({
            token: token,
            password: '12121212'
        });

        const updateUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('12121212')
        expect(updateUser?.password).toBe('12121212');

    });

    it('should not be able to reset the password with non-existing token', async () => {
        await expect(
            resetPassword.execute({
                token: 'non-existing-token',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password with non-existing user', async () => {
        const { token } = await fakeUserTokenRepository.generate('non-existing-user');
        await expect(
            resetPassword.execute({
                token,
                password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password if passed more than 2 hours', async () => {

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345'
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        })

        await expect(resetPassword.execute({
            token: token,
            password: '12121212'
        })
        ).rejects.toBeInstanceOf(AppError);

    });
});