import { ObjectID, Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity('notifications')
export default class Notofication {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    content: string;

    @Column('uuid')
    recipient_id: string;

    @Column({ default: false })
    read: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}