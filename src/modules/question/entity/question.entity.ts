import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Theme } from 'src/modules/theme/entity/theme.entity';

@Table({
    tableName: 'questions',
    timestamps: false
})
export class Question extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id_question: number;
    @Column({
        type: DataType.INTEGER
    })
    declare id_exam_type: number;

    @Column({
        type: DataType.INTEGER
    })
    @ForeignKey(() => Theme)
    declare id_theme: number;

    @Column({
        type: DataType.NUMBER
    })
    declare year: number;
    @Column({
        type: DataType.STRING
    })
    declare question: string;

    @Column({
        type: DataType.STRING
    })
    declare image: string;
    @Column({
        type: DataType.STRING
    })
    declare comment: string;
    @Column({
        type: DataType.INTEGER
    })
    declare image_comment: number;
    @Column({
        type: DataType.STRING
    })
    declare alt_a: string;
    @Column({
        type: DataType.STRING
    })
    declare alt_b: string;
    @Column({
        type: DataType.STRING
    })
    declare alt_c: string;
    @Column({
        type: DataType.STRING
    })
    declare alt_d: string;
    @Column({
        type: DataType.STRING
    })
    declare alt_e: string;
    @Column({
        type: DataType.STRING
    })
    declare response: string;
    @Column({
        type: DataType.STRING
    })
    declare justification: string;
    @Column({
        type: DataType.STRING
    })
    declare image_justification: string;
    @Column({
        type: DataType.STRING
    })
    declare drbank: string;
    @Column({
        type: DataType.INTEGER
    })
    declare status: number;
    @BelongsTo(() => Theme, { as: 'theme' })
    declare theme: Theme;
}
