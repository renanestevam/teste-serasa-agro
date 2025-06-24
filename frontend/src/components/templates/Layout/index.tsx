import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: #1f2937;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  margin-right: 2rem;
`;

const NavLinkStyled = styled(NavLink)`
  color: #d1d5db;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    color: white;
    background-color: #374151;
  }

  &.active {
    color: white;
    background-color: #3b82f6;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f9fafb;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header>
        <Nav>
          <Logo>Serasa Agro</Logo>
          <NavLinkStyled to="/">Dashboard</NavLinkStyled>
          <NavLinkStyled to="/producers">Produtores</NavLinkStyled>
        </Nav>
      </Header>
      <Main>
        <Container>{children}</Container>
      </Main>
    </LayoutContainer>
  );
};
