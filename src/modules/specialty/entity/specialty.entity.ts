import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Area } from 'src/modules/area/entity/area.entity';

@Table({
    tableName: 'specialties',
    timestamps: false
})
export class Specialty extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id_specialty: number;
    @ForeignKey(() => Area)
    @Column({
        type: DataType.INTEGER
    })
    declare id_area: number;
    @Column({
        type: DataType.STRING
    })
    declare specialty: string;
    @Column({
        type: DataType.STRING
    })
    declare code: string;
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
    @BelongsTo(()=>Area,{as:'areas'})
    declare area:Area;
}
