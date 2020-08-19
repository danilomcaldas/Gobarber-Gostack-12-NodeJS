import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';


let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;


describe('UpdateProfileService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfileService = new UpdateProfileService(fakeUserRepository, fakeHashProvider);
    })
    it('should be able to update the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updateUserProfile = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@exemple.com',
        })

        expect(updateUserProfile.name).toBe('John Trê');
        expect(updateUserProfile.email).toBe('johntre@exemple.com');

    });

    it('should not be able update the profile from non-existing user', async () => {

        expect(updateProfileService.execute({
            user_id: 'non-existing user.',
            name: 'Teste',
            email: 'test6e@teste.com',
        }),
        ).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to change to another user email', async () => {
        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user = await fakeUserRepository.create({
            name: 'Test',
            email: 'test@example.com',
            password: '123456',
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'Test',
            email: 'johndoe@example.com'
        }),
        ).rejects.toBeInstanceOf(AppError)

    });

    it('should be able to update the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updateUserProfile = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@exemple.com',
            old_password: '123456',
            password: '123123123',
        })

        expect(updateUserProfile.password).toBe('123123123');

    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@exemple.com',
            password: '123123123',
        }),
        ).rejects.toBeInstanceOf(AppError)



    });

    it('should not be able to update the password without wrong old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@exemple.com',
            old_password: "wrong-old-password",
            password: '123123123',
        }),
        ).rejects.toBeInstanceOf(AppError)



    });



});