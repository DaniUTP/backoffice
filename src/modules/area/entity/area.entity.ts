import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Specialty } from 'src/modules/specialty/entity/specialty.entity';

@Table({
    tableName: 'areas',
    timestamps: false
})
export class Area extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id_area: number;
    @Column({
        type: DataType.STRING
    })
    declare code: string;
    @Column({
        type: DataType.STRING
    })
    declare area: string;
    @Column({
        type: DataType.STRING
    })
    declare description: string;
    @Column({
        type: DataType.STRING
    })
    declare icon: string;
    @Column({
        type: DataType.INTEGER
    })
    declare status: number;
    @HasMany(()=>Specialty,{as:'specialties'})
    declare specialties:Specialty[];
}
