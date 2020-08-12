import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import ICreateAppointmentDTo from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTo): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
}