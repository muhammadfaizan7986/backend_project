import { IsNumberString, IsOptional } from 'class-validator';
import { SortOrder } from 'mongoose';

export class PaginationDto {
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  sort?: string | { [key: string]: SortOrder } | [string, SortOrder][];
  //
}
