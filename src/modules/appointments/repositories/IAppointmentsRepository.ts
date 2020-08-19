import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import ICreateAppointmentDTo from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindInMonthFromproviderDTO from '../dtos/IFindInMonthFromProviderDTO';
import IFindInDayFromProviderDTO from '../dtos/IFindInDayFromProviderDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTo): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(data: IFindInMonthFromproviderDTO): Promise<Appointment[]>;
    findAllInDayFromProvider(data: IFindInDayFromProviderDTO): Promise<Appointment[]>;
}