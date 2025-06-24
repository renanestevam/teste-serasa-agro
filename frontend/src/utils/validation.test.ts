import { validateCpf, validateCnpj, validateCpfOrCnpj, formatCpfCnpj } from './validation';

describe('Validation Utils', () => {
  describe('validateCpf', () => {
    it('should return true for valid CPF', () => {
      expect(validateCpf('11144477735')).toBe(true);
    });

    it('should return false for invalid CPF', () => {
      expect(validateCpf('12345678901')).toBe(false);
      expect(validateCpf('11111111111')).toBe(false);
    });
  });

  describe('validateCnpj', () => {
    it('should return true for valid CNPJ', () => {
      expect(validateCnpj('11222333000181')).toBe(true);
    });

    it('should return false for invalid CNPJ', () => {
      expect(validateCnpj('12345678000100')).toBe(false);
      expect(validateCnpj('11111111111111')).toBe(false);
    });
  });

  describe('validateCpfOrCnpj', () => {
    it('should validate CPF or CNPJ correctly', () => {
      expect(validateCpfOrCnpj('11144477735')).toBe(true);
      expect(validateCpfOrCnpj('11222333000181')).toBe(true);
      expect(validateCpfOrCnpj('12345678901')).toBe(false);
    });
  });

  describe('formatCpfCnpj', () => {
    it('should format CPF correctly', () => {
      expect(formatCpfCnpj('11144477735')).toBe('111.444.777-35');
    });

    it('should format CNPJ correctly', () => {
      expect(formatCpfCnpj('11222333000181')).toBe('11.222.333/0001-81');
    });
  });
});