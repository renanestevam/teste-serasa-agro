import { IsString, IsNotEmpty, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CpfCnpjValidator } from './validators/cpf-cnpj.validator';

export class CreateProducerDto {
  @ApiProperty({ description: 'CPF or CNPJ of the producer' })
  @IsString()
  @IsNotEmpty()
  @Validate(CpfCnpjValidator)
  cpfCnpj: string;

  @ApiProperty({ description: 'Name of the producer' })
  @IsString()
  @IsNotEmpty()
  producerName: string;
}