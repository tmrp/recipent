import React from 'react';
import styled from '@emotion/styled';

interface RecipeGridProps {
  children: React.ReactNode;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  /* Adding a breakpoint for mobile */
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
  width: 100%;
`;

function RecipeGrid({ children }: RecipeGridProps) {
  return <Grid>{children}</Grid>;
}

export default RecipeGrid;
