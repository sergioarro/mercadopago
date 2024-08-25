import { ApiProperty } from '@nestjs/swagger';

export class AuthorDto {
  @ApiProperty({ example: 'Sergio' })
  name: string;

  @ApiProperty({ example: 'Arro' })
  lastname: string;

  constructor(name: string, lastname: string) {
    this.name = name;
    this.lastname = lastname;
  }
}
