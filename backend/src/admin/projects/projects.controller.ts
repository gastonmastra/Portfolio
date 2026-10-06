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
  IsUrl,
  MaxLength,
} from 'class-validator';
import { EmptyToNull, toDate } from '../../common/transformers.js';
import { assertDateRange } from '../../common/date-range.js';
import { PrismaService } from '../../database/prisma.service.js';

export class ProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  name: string;

  @EmptyToNull()
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string | null;

  @EmptyToNull()
  @IsOptional()
  @IsUrl()
  url?: string | null;

  @EmptyToNull()
  @IsOptional()
  @IsUrl()
  repoUrl?: string | null;

  @EmptyToNull()
  @IsOptional()
  @IsISO8601({ strict: true })
  startDate?: string | null;

  @EmptyToNull()
  @IsOptional()
  @IsISO8601({ strict: true })
  endDate?: string | null;

  @IsInt()
  sortOrder: number;

  @IsArray()
  @IsInt({ each: true })
  skillIds: number[];
}

const includeSkills = {
  skills: { select: { id: true, name: true, category: true } },
};

@Controller('projects')
export class ProjectsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.project.findMany({
      include: includeSkills,
      orderBy: [{ sortOrder: 'asc' }, { startDate: 'desc' }],
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.project.findUniqueOrThrow({
      where: { id },
      include: includeSkills,
    });
  }

  @Post()
  create(@Body() dto: ProjectDto) {
    const { skillIds, ...data } = toData(dto);
    return this.prisma.project.create({
      data: { ...data, skills: { connect: skillIds.map((id) => ({ id })) } },
      include: includeSkills,
    });
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProjectDto) {
    const { skillIds, ...data } = toData(dto);
    return this.prisma.project.update({
      where: { id },
      data: { ...data, skills: { set: skillIds.map((id) => ({ id })) } },
      include: includeSkills,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.prisma.project.delete({ where: { id } });
  }
}

function toData(dto: ProjectDto) {
  assertDateRange(dto.startDate, dto.endDate);
  return {
    ...dto,
    description: dto.description ?? null,
    url: dto.url ?? null,
    repoUrl: dto.repoUrl ?? null,
    startDate: toDate(dto.startDate),
    endDate: toDate(dto.endDate),
  };
}
