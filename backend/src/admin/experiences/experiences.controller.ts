import {
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
  IsArray,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EmptyToNull, toDate } from '../../common/transformers.js';
import { assertDateRange } from '../../common/date-range.js';
import { PrismaService } from '../../database/prisma.service.js';

export class ExperienceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  company: string;

  @IsISO8601({ strict: true })
  startDate: string;

  @EmptyToNull()
  @IsOptional()
  @IsISO8601({ strict: true })
  endDate?: string | null;

  @EmptyToNull()
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string | null;

  @IsInt()
  sortOrder: number;

  @IsArray()
  @IsInt({ each: true })
  skillIds: number[];
}

const includeSkills = {
  skills: { select: { id: true, name: true, category: true } },
};

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.experience.findMany({
      include: includeSkills,
      orderBy: [{ sortOrder: 'asc' }, { startDate: 'desc' }],
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.experience.findUniqueOrThrow({
      where: { id },
      include: includeSkills,
    });
  }

  @Post()
  create(@Body() dto: ExperienceDto) {
    const { skillIds, ...data } = toData(dto);
    return this.prisma.experience.create({
      data: { ...data, skills: { connect: skillIds.map((id) => ({ id })) } },
      include: includeSkills,
    });
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: ExperienceDto) {
    const { skillIds, ...data } = toData(dto);
    return this.prisma.experience.update({
      where: { id },
      data: { ...data, skills: { set: skillIds.map((id) => ({ id })) } },
      include: includeSkills,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.prisma.experience.delete({ where: { id } });
  }
}

function toData(dto: ExperienceDto) {
  assertDateRange(dto.startDate, dto.endDate);
  return {
    ...dto,
    startDate: new Date(dto.startDate),
    endDate: toDate(dto.endDate),
    description: dto.description ?? null,
  };
}
