import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min, Max, IsLatitude, IsLongitude } from 'class-validator';

export class GetEstimateDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsNotEmpty()
  @Min(2010)
  @Max(2024)
  year: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsNotEmpty()
  milage: number;

  @Transform(({ value }) => +value)
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => +value)
  @IsLongitude()
  lng: number;
}
