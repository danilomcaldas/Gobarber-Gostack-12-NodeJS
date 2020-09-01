import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';



let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;


describe('ListProviderAppointmentsService', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentRepository, fakeCacheProvider);

    })
    it('should be able to list the appointments on a specific day', async () => {
        const appointments1 = await fakeAppointmentRepository.create({
            user_id: 'user',
            provider_id: 'provider',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

        const appointments2 = await fakeAppointmentRepository.create({
            user_id: 'user',
            provider_id: 'provider',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });

        const appointments = await listProviderAppointmentsService.execute({
            provider_id: 'provider',
            year: 2020,
            month: 5,
            day: 20,

        });

        expect(appointments).toEqual([
            appointments1, appointments2
        ]);

    });


});