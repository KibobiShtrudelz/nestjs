import { Expose, Transform } from 'class-transformer'

import { User } from 'src/users/entities/user.entity'

export class ReportDto {
  @Expose()
  id: number

  @Expose()
  price: number

  @Expose()
  year: number

  @Expose()
  lng: number

  @Expose()
  lat: number

  @Expose()
  make: string

  @Expose()
  model: string

  @Expose()
  mileage: number

  @Transform(({ obj }) => obj.user.id) // Това ще вземе "id" от "user" обекта и ще назначи стойността на "userId"
  @Expose()
  userId: number
}
