import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Question } from 'src/modules/question/entity/question.entity';
import { Specialty } from 'src/modules/specialty/entity/specialty.entity';

@Table({
    tableName: 'themes',
    timestamps: false
})
export class Theme extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id_theme: number;
    @Column({
        type: DataType.STRING
    })
    declare uuid: string;

    @Column({
        type: DataType.INTEGER
    })
    @ForeignKey(() => Specialty)
    declare id_specialty: number;
    @Column({
        type: DataType.STRING
    })
    declare theme: string;
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
    @BelongsTo(() => Specialty, { as: 'specialties' })
    declare specialty: Specialty;
    @HasMany(() => Question, { as: 'questions' })
    declare questions: Question[];
}
