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
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { SkillCategory } from '../../generated/prisma/client.js';
import { EmptyToNull } from '../../common/transformers.js';
import { PrismaService } from '../../database/prisma.service.js';

export class SkillDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name: string;

  @IsEnum(SkillCategory)
  category: SkillCategory;

  @EmptyToNull()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string | null;

  @IsInt()
  sortOrder: number;
}

@Controller('skills')
export class SkillsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.skill.findUniqueOrThrow({ where: { id } });
  }

  @Post()
  create(@Body() dto: SkillDto) {
    return this.prisma.skill.create({ data: toData(dto) });
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: SkillDto) {
    return this.prisma.skill.update({ where: { id }, data: toData(dto) });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.prisma.skill.delete({ where: { id } });
  }
}

function toData(dto: SkillDto) {
  return { ...dto, description: dto.description ?? null };
}
