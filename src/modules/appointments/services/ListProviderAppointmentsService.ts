import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointments';

interface IRequest {
    provider_id: string;
    day: number;
    year: number;
    month: number;
}


@injectable()
class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) { };
    public async execute({ provider_id, day, year, month }: IRequest): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id, day, year, month
        },
        );

        return appointments;

    }
}


export default ListProviderAppointmentsService;