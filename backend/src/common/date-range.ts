import { BadRequestException } from '@nestjs/common';

/** Ensures an optional end date (`YYYY-MM-DD`) is not before its start date. */
export function assertDateRange(
  start: string | null | undefined,
  end: string | null | undefined,
): void {
  if (start && end && end < start) {
    throw new BadRequestException('endDate must not be before startDate');
  }
}
