import { EntityRepository, Repository, getRepository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindInMonthFromproviderDTO from '@modules/appointments/dtos/IFindInMonthFromProviderDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IFindInDayFromProviderDTO from '@modules/appointments/dtos/IFindInDayFromProviderDTO';


@EntityRepository(Appointment)
class AppointmentsRepository implements IAppointmentsRepository {

    private ormRepository: Repository<Appointment>;
    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });
        return findAppointment;
    }

    public async findAllInMonthFromProvider({ provider_id, month, year }: IFindInMonthFromproviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');


        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(dataFieldName =>
                    `to_char(${dataFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
                ),
            }
        })

        return appointments;
    }

    public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindInDayFromProviderDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');


        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(dataFieldName =>
                    `to_char(${dataFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
                ),
            }
        })

        return appointments;
    }

    public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, user_id, date });

        await this.ormRepository.save(appointment);

        return appointment;

    }

}

export default AppointmentsRepository;