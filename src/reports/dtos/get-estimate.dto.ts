import { Transform } from 'class-transformer'
import { Min, Max, IsNumber, IsString, IsLatitude, IsLongitude } from 'class-validator'
import { parse } from 'path'

export class GetEstimateDto {
  @Transform(({ value }) => parseFloat(value)) // Обръща стойността на value в число
  @IsNumber()
  @IsLongitude()
  lng: number

  @Transform(({ value }) => parseFloat(value)) // Обръща стойността на value в число
  @IsNumber()
  @IsLatitude()
  lat: number

  @IsString()
  make: string

  @Transform(({ value }) => parseInt(value)) // Обръща стойността на value в число
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number

  @IsString()
  model: string

  @Transform(({ value }) => parseInt(value)) // Обръща стойността на value в число
  @IsNumber()
  @Min(0)
  @Max(1_000_000)
  mileage: number
}
