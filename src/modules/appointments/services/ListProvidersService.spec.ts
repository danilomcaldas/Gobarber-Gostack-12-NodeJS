//import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';



let fakeUserRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;


describe('ListProvidersService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProvidersService = new ListProvidersService(fakeUserRepository, fakeCacheProvider);
    })
    it('should be able to list the providers', async () => {
        const user1 = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user2 = await fakeUserRepository.create({
            name: 'John Trê',
            email: 'johntre@example.com',
            password: '123456',
        });

        const loggedUser = await fakeUserRepository.create({
            name: 'John Qua',
            email: 'johnqua@example.com',
            password: '123456',
        });

        const providers = await listProvidersService.execute({
            user_id: loggedUser.id,
        })

        expect(providers).toEqual([
            user1, user2
        ]);


    });


});