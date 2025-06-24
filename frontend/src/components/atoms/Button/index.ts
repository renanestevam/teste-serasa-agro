import styled from 'styled-components';

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: #3b82f6;
          color: white;
          &:hover { background-color: #2563eb; }
          &:disabled { background-color: #9ca3af; cursor: not-allowed; }
        `;
      case 'secondary':
        return `
          background-color: #f3f4f6;
          color: #374151;
          &:hover { background-color: #e5e7eb; }
          &:disabled { background-color: #f9fafb; cursor: not-allowed; }
        `;
      case 'danger':
        return `
          background-color: #ef4444;
          color: white;
          &:hover { background-color: #dc2626; }
          &:disabled { background-color: #9ca3af; cursor: not-allowed; }
        `;
      default:
        return '';
    }
  }}
`;