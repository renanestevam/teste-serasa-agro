import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'areaSum', async: false })
export class AreaSumValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    const cultivableArea = object.cultivableArea || 0;
    const vegetationArea = object.vegetationArea || 0;
    const totalArea = object.totalArea || 0;
    
    return (cultivableArea + vegetationArea) <= totalArea;
  }

  defaultMessage(args: ValidationArguments) {
    return 'The sum of cultivable area and vegetation area cannot exceed the total area';
  }
}