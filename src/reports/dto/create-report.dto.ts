import { IsNotEmpty, IsNumber, IsString, Min, Max, IsLatitude, IsLongitude } from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1_000_000)
  price: number;

  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(2010)
  @Max(2024)
  year: number;

  @IsNumber()
  @IsNotEmpty()
  milage: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;
}
