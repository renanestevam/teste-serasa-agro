import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { validateCpfOrCnpj } from '../../utils/cpf-cnpj.validator';

@ValidatorConstraint({ name: 'cpfCnpj', async: false })
export class CpfCnpjValidator implements ValidatorConstraintInterface {
  validate(cpfCnpj: string, args: ValidationArguments) {
    return validateCpfOrCnpj(cpfCnpj);
  }

  defaultMessage(args: ValidationArguments) {
    return 'CPF or CNPJ is not valid';
  }
}