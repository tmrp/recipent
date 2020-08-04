import React from 'react';
import styled from '@emotion/styled';
// I'm trying lazyLoad for image loading. I ding Gatsby Image to be superior
import LazyLoad from 'react-lazyload';

const Card = styled.div`
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px,
    rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  /* height: 100%; */
`;

const CardImage = styled.img`
  border-radius: 5px 5px 0px 0px;
  margin: 0 auto;
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const CardTitle = styled.h3`
  font-size: 21px;
  color: #0a0a0a;
  margin: 5px;
  padding: 5px;
  font-family: monospace;
`;

// I'm using CSS Grid for placing items on the recipe cards

const CardInformation = styled.div`
  margin: 5px;
  padding: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 0.5fr;
  position: relative;
  object-fit: cover;
`;

const RecipeInformation = styled.p`
  color: #0a0a0a;
  font-size: 16px;
  font-family: monospace;
  grid-column: 1 / -1;
  grid-row: 1 / 1;
`;

const CardLink = styled.a`
  font-weight: 800;
  display: contents;
  text-decoration: none;
`;

const CardButton = styled.button`
  background-color: #008bff;
  border-radius: 5px;
  color: #fff;
  padding: 0.5em 0.5em;
  text-align: center;
  display: inline-block;
  font-size: 18px;
  border: none;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px,
    rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  grid-column: 1 / -1;
  /* Hight light slight button color change for added effect */
  :hover {
    background-color: #38a3fc;
    transition: 0.2s;
  }
`;

// Type checking the props. The question mark means that those props are not required

interface RecipeCardProps {
  recipeKey: number;
  recipeImage: string;
  recipeImageAlt: string;
  recipeTitle: string;
  recipeServings?: number;
  recipeTime?: number;
  recipeLink?: string;
}

function RecipeCard({
  recipeKey,
  recipeImage,
  recipeImageAlt,
  recipeTitle,
  recipeServings,
  recipeTime,
  recipeLink,
}: RecipeCardProps) {
  return (
    <Card key={recipeKey}>
      <LazyLoad offset={100}>
        <CardImage src={recipeImage} alt={recipeImageAlt} />
      </LazyLoad>
      <CardTitle>{recipeTitle}</CardTitle>
      <CardInformation>
        {/* Adding text to clearly show ho many can be fed and how long it takes to prepare */}
        <RecipeInformation>
          This recipe serves: {recipeServings}
          <br /> Ready in: {recipeTime}
        </RecipeInformation>
        {/* using noopener noreferrer just as a precaution as the links are outside links*/}
        <CardLink href={recipeLink} target="_blank" rel="noopener noreferrer">
          <CardButton>Go to recipe</CardButton>
        </CardLink>
      </CardInformation>
    </Card>
  );
}

export default RecipeCard;
