import styled from 'styled-components';

export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ hasError }) => hasError ? '#ef4444' : '#d1d5db'};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ hasError }) => hasError ? '#ef4444' : '#3b82f6'};
    box-shadow: 0 0 0 3px ${({ hasError }) => hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
  }
  
  &:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
  }
`;

export const Select = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ hasError }) => hasError ? '#ef4444' : '#d1d5db'};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: white;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ hasError }) => hasError ? '#ef4444' : '#3b82f6'};
    box-shadow: 0 0 0 3px ${({ hasError }) => hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
  }
  
  &:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ hasError }) => hasError ? '#ef4444' : '#d1d5db'};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ hasError }) => hasError ? '#ef4444' : '#3b82f6'};
    box-shadow: 0 0 0 3px ${({ hasError }) => hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
  }
  
  &:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
  }
`;