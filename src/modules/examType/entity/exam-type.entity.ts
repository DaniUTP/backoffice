import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'exam_type',
    timestamps: false
})
export class ExamType extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id_exam_type: number;
    @Column({
        type: DataType.STRING
    })
    declare exam_type: string;
}
