import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { StudyModality } from '../../generated/prisma/client.js';
import { EmptyToNull } from '../../common/transformers.js';
import { PrismaService } from '../../database/prisma.service.js';

export class StudyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  institution: string;

  @IsEnum(StudyModality)
  modality: StudyModality;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  gradeAverage?: number | null;

  @IsInt()
  @Min(1900)
  @Max(2200)
  startYear: number;

  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(2200)
  endYear?: number | null;

  @EmptyToNull()
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string | null;

  @IsInt()
  sortOrder: number;
}

@Controller('studies')
export class StudiesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.study.findMany({
      orderBy: [{ sortOrder: 'asc' }, { startYear: 'desc' }],
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.study.findUniqueOrThrow({ where: { id } });
  }

  @Post()
  create(@Body() dto: StudyDto) {
    return this.prisma.study.create({ data: toData(dto) });
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: StudyDto) {
    return this.prisma.study.update({ where: { id }, data: toData(dto) });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.prisma.study.delete({ where: { id } });
  }
}

function toData(dto: StudyDto) {
  if (dto.endYear != null && dto.endYear < dto.startYear) {
    throw new BadRequestException('endYear must not be before startYear');
  }
  return {
    ...dto,
    gradeAverage: dto.gradeAverage ?? null,
    endYear: dto.endYear ?? null,
    description: dto.description ?? null,
  };
}
