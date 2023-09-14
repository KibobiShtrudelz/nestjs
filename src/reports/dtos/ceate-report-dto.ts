import { Min, Max, IsNumber, IsString, IsLatitude, IsLongitude } from 'class-validator'

export class CreateReportDto {
  @IsNumber()
  @IsLongitude()
  lng: number

  @IsNumber()
  @IsLatitude()
  lat: number

  @IsString()
  make: string

  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number

  @IsNumber()
  @Min(0)
  @Max(1_000_000)
  price: number

  @IsString()
  model: string

  @IsNumber()
  @Min(0)
  @Max(1_000_000)
  mileage: number
}
