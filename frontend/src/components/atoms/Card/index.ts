import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
`;

export const CardHeader = styled.div`
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

export const CardContent = styled.div`
  flex: 1;
`;

export const CardFooter = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;