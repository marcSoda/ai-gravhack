import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;
const StyledLink = styled.a`
  text-decoration: none;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

function Home() {
  return <h2>Shadowbase AI Assistant</h2>;
}

function About() {
  return (
    <div>
      <h2>About Shadowbase AI Assistant</h2>
      <p>
        Powered by Alicia, Chris, Marc, Paden, and Rich!
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Container>
      <Nav>
        <StyledLink href="/">Home</StyledLink>
        <StyledLink href="/about">About</StyledLink>
      </Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Container>
  );
}
