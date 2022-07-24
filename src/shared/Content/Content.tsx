import React from 'react';
import './content.css';
import Container from 'react-bootstrap/Container';

interface IContentProps {
  children?: React.ReactNode;
}

export function Content({ children }: IContentProps) {
  return (
    <main className="app__content content">
      <Container className="content__container">{children}</Container>
    </main>
  );
}
