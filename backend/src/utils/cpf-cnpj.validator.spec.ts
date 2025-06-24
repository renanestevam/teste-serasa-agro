import { validateCpf, validateCnpj, validateCpfOrCnpj } from './cpf-cnpj.validator';

describe('CPF/CNPJ Validator', () => {
  describe('validateCpf', () => {
    it('should return true for valid CPF', () => {
      expect(validateCpf('11144477735')).toBe(true);
    });

    it('should return false for invalid CPF', () => {
      expect(validateCpf('12345678901')).toBe(false);
      expect(validateCpf('11111111111')).toBe(false);
      expect(validateCpf('123456789')).toBe(false);
    });
  });

  describe('validateCnpj', () => {
    it('should return true for valid CNPJ', () => {
      expect(validateCnpj('11222333000181')).toBe(true);
    });

    it('should return false for invalid CNPJ', () => {
      expect(validateCnpj('12345678000100')).toBe(false);
      expect(validateCnpj('11111111111111')).toBe(false);
      expect(validateCnpj('123456789')).toBe(false);
    });
  });

  describe('validateCpfOrCnpj', () => {
    it('should validate CPF correctly', () => {
      expect(validateCpfOrCnpj('11144477735')).toBe(true);
      expect(validateCpfOrCnpj('12345678901')).toBe(false);
    });

    it('should validate CNPJ correctly', () => {
      expect(validateCpfOrCnpj('11222333000181')).toBe(true);
      expect(validateCpfOrCnpj('12345678000100')).toBe(false);
    });

    it('should return false for invalid length', () => {
      expect(validateCpfOrCnpj('123')).toBe(false);
      expect(validateCpfOrCnpj('123456789012345')).toBe(false);
    });
  });
});