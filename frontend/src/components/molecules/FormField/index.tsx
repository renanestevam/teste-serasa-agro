import React from 'react';
import styled from 'styled-components';
import { Input, Select } from '../../atoms/Input';
import { Label, ErrorText } from '../../atoms/Typography';

const FieldContainer = styled.div`
  margin-bottom: 1rem;
`;

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'email' | 'select';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  options,
  placeholder,
  required = false,
}) => {
  return (
    <FieldContainer>
      <Label htmlFor={name}>
        {label} {required && '*'}
      </Label>
      {type === 'select' ? (
        <Select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          hasError={!!error}
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          hasError={!!error}
          step={type === 'number' ? '0.01' : undefined}
        />
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </FieldContainer>
  );
};