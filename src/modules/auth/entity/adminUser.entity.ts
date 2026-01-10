import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'admin_user',
    timestamps: false
})
export class AdminUser extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id_admin_user: number;
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
        type: DataType.STRING
    })
    declare password: string;
    @Column({
        type: DataType.DATE
    })
    declare last_login: Date;
    @Column({
        type: DataType.INTEGER
    })
    declare status: number;
}
