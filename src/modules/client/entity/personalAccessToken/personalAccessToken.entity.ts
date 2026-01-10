import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'personal_access_tokens',
    timestamps: false
})
export class PersonalAccessToken extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;
    @Column({
        type: DataType.STRING
    })
    declare tokenable_type: string;
    @Column({
        type: DataType.BIGINT
    })
    declare tokenable_id: number;
    @Column({
        type: DataType.STRING
    })
    declare name: string;
    @Column({
        type: DataType.STRING
    })
    declare token: string;
    @Column({
        type: DataType.STRING
    })
    declare abilities: string;
    @Column({
        type: DataType.DATE
    })
    declare last_used_at: Date;

    @Column({
        type: DataType.DATE
    })
    declare expired_at: Date;
}
