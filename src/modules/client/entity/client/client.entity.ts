import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'clients',
    timestamps: false
})
export class Client extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id_client: number;
    @Column({
        type: DataType.INTEGER
    })
    declare level: number;
    @Column({
        type: DataType.STRING
    })
    declare name: string;
    @Column({
        type: DataType.STRING
    })
    declare last_name: string;
    @Column({
        type: DataType.STRING
    })
    declare email: string;
    @Column({
        type: DataType.INTEGER
    })
    declare phone: number;
    @Column({
        type: DataType.STRING
    })
    declare photo: string;
    @Column({
        type: DataType.STRING
    })
    declare password: string;
    @Column({
        type: DataType.STRING
    })
    declare code_active: string;
    @Column({
        type: DataType.DATE
    })
    declare last_login: Date;
    @Column({
        type: DataType.INTEGER
    })
    declare social_login: number;
    @Column({
        type: DataType.INTEGER
    })
    declare status: number;
}
