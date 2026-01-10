import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'client_firebases',
    timestamps: false
})
export class ClientFirebase extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id_client_firebase: number;
    @Column({
        type: DataType.INTEGER
    })
    declare id_client: number;

    @Column({
        type: DataType.STRING
    })
    declare token_firebase: string;

    @Column({
        type: DataType.INTEGER
    })
    declare status: number;
}
