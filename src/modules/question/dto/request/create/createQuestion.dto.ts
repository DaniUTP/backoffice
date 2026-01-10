import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Matches } from "class-validator";
import { LanguageDto } from "src/shared/dto/language.dto";

export class CreateQuestionDto extends LanguageDto {

    @ApiProperty({
        example: "ENAM",
        description: "Identificador del tipo de examen"
    })
    @Matches(/^[a-zA-Z0-9\s-]+$/)
    @IsString()
    @IsNotEmpty()
    id_exam_type: string;

    @ApiProperty({
        example: 38,
        description: "Identificador del tema"
    })
    @IsNumber()
    @IsNotEmpty()
    id_theme: number;

    @ApiProperty({
        example: "2024",
        description: "Año"
    })
    @Matches(/^[a-zA-Z0-9\s-]+$/)
    @IsString()
    @IsNotEmpty()
    year: string;

    @ApiProperty({
        example: "La dirección consiste en influir en los seres humanos, para que contribuyan a la obtención de metas de la organización y del grupo. Las personas encargadas de dirigir, además de su capacidad técnica y conocimiento adecuado de los objetivos institucionales, ¿cuál de las siguientes condiciones necesita para una buena dirección?",
        description: "Pregunta del examen"
    })
    @Matches(/^[a-zA-Z0-9\s-]+$/)
    @IsString()
    @IsNotEmpty()
    question: string;

    @ApiProperty({
        example: "https://example.com/image.jpg",
        description: "Imagen de la pregunta"
    })
    @IsUrl()
    @IsOptional()
    image: string;

    @ApiProperty({
        example: "Comentario 1",
        description: "Comentario de la pregunta"
    })
    @IsString()
    @IsOptional()
    comment: string;

    @ApiProperty({
        example: "https://example.com/image_comment.jpg",
        description: "Imagen del comentario"
    })
    @IsUrl()
    @IsOptional()
    image_comment: string;

    @ApiProperty({
        example: "A",
        description: "Alternativa A"
    })
    @Matches(/^[a-zA-Z0-9\s-]+$/)
    @IsString()
    @IsNotEmpty()
    alt_a: string;

    @ApiProperty({
        example: "B",
        description: "Alternativa B"
    })
    @Matches(/^[a-zA-Z0-9\s-]+$/)
    @IsString()
    @IsNotEmpty()
    alt_b: string;

    @ApiProperty({
        example: "C",
        description: "Alternativa C"
    })
    @Matches(/^[a-zA-Z0-9\s-]+$/)
    @IsString()
    @IsOptional()
    alt_c: string;

    @ApiProperty({
        example: "D",
        description: "Alternativa D"
    })
    @Matches(/^[a-zA-Z0-9\s-]+$/)
    @IsString()
    @IsOptional()
    alt_d: string;

    @ApiProperty({
        example: "E",
        description: "Alternativa E"
    })
    @Matches(/^[a-zA-Z0-9\s-]+$/)
    @IsString()
    @IsOptional()
    alt_e: string;

    @ApiProperty({
        example: "A",
        description: "Respuesta correcta"
    })
    @Matches(/^[a-zA-Z0-9\s-]+$/)
    @IsString()
    @IsNotEmpty()
    response: string;

    @ApiProperty({
        example: "Justificación 1",
        description: "Justificación de la respuesta"
    })
    @Matches(/^[a-zA-Z0-9\s-]+$/)
    @IsString()
    @IsNotEmpty()
    justification: string;

    @ApiProperty({
        example: "https://example.com/image_justification.jpg",
        description: "Imagen de la justificación"
    })
    @IsUrl()
    @IsOptional()
    image_justification: string;
}