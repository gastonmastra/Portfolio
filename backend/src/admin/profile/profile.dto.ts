import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { EmptyToNull } from '../../common/transformers.js';

export class ProfileDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  lastName: string;

  @IsString()
  @MaxLength(160)
  headline: string;

  @IsString()
  @MaxLength(4000)
  about: string;

  @EmptyToNull()
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @EmptyToNull()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  location?: string | null;

  @EmptyToNull()
  @IsOptional()
  @IsUrl()
  githubUrl?: string | null;

  @EmptyToNull()
  @IsOptional()
  @IsUrl()
  linkedinUrl?: string | null;
}
