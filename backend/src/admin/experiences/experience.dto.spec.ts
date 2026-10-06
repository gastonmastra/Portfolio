import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { assertDateRange } from '../../common/date-range.js';
import { ExperienceDto } from './experiences.controller.js';

const valid = {
  title: 'Engineer',
  company: 'ACME',
  startDate: '2024-01-01',
  endDate: '',
  description: '  ',
  sortOrder: 0,
  skillIds: [1, 2],
};

describe('ExperienceDto', () => {
  it('accepts a valid payload and turns blank optional fields into null', async () => {
    const dto = plainToInstance(ExperienceDto, valid);
    expect(await validate(dto)).toHaveLength(0);
    expect(dto.endDate).toBeNull();
    expect(dto.description).toBeNull();
  });

  it('rejects missing required fields and malformed dates', async () => {
    const dto = plainToInstance(ExperienceDto, { ...valid, title: '', startDate: '01/01/2024' });
    const failed = (await validate(dto)).map((error) => error.property);
    expect(failed).toEqual(expect.arrayContaining(['title', 'startDate']));
  });
});

describe('assertDateRange', () => {
  it('throws when the end date is before the start date', () => {
    expect(() => assertDateRange('2024-05-01', '2024-01-01')).toThrow(BadRequestException);
    expect(() => assertDateRange('2024-05-01', null)).not.toThrow();
  });
});
