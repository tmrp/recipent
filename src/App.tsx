import React, { useState } from 'react';
// The comments pertain the subject matter below the comment
// Like this one pertains to "import styled from '@emotion/styled';" I'll be using styled components from emotion for most of my styling
import styled from '@emotion/styled';
// Using Axios for fetching the API. The reason I'm using Axios is because I can also do make it with a useFetch useEffect but I'm not proficient enough to make it fast without consulting the internet/Google
import Axios from 'axios';
// Im using feeding the Spoonacular Food API foor intolerance JSON data
import { intolerances } from './data/intolerances.json';
// Import components made primarily with styled components. I could make this al in one page but wanted to show that I can be tidy when I wat to.
import AppWrapper from './components/app-wrapper';
import RecipeCard from './components/recipe-card';
import RecipeGrid from './components/recipe-grid';

// Import Material UI components
// For the search form I am using the Autocomplete component library by Material UI. The reason being is that I can't make an autocomplete dropdown select form from scratch without spending about 12 hours researching and testing. This is something I am working on and very eager to learn!
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

// Using dotenv for encirounment variables to protect the API key information. I think I only have about 1500 request on the free account. The environment variables will be set in Netlify hosting.
require('dotenv').config();

// Usually this will be made the 'propper' and inside the components library. This is me basically at my sloppiest.
const AppHeader = styled.div`
  font-family: monospace;
  margin-bottom: 20px;
  h1 {
    font-size: 38px;
  }
  h2 {
    font-size: 28px;
    font-weight: 200;
  }
`;

// Same goes for this.
const SearchWrapper = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  /* Made the 'actual interface' a slightly different color to grab the users intention */
  background-color: #fffef5;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px,
    rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  border-radius: 10px;
`;

// start the app. I accidentaly rewrote function App to const App out of habit.
const App = () => {
  // Using the useState hook for api and data state management
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState([]);

  // The food api URL
  const foodAPI = `https://api.spoonacular.com/recipes/search?intolerances=${input}&number=100&instructionsRequired=true&limitLicense=false&apiKey=${process.env.REACT_APP_FOOD_API_KEY}`;

  // I'm leaving the console logs because they helped out the most when querying the API. It took me a while to get the API working because the documentation mentioned that the API key be stored somewhere in the middle of the url. It turns out this needs to be stored all the way at the end..
  console.log('Food api callback', foodAPI);

  // Fetching the food data for the recipe grid.
  const getData = async () => {
    // I'm using async and wait here to to fetch the data before passing it to setRecipes
    const result = await Axios.get(foodAPI);
    // To map out the propper data structure I used Postman (GUI). Creates an easy way to feed your api credentials through the url and then generates a usable json
    setRecipes(result.data.results);
    // Again, logging the results
    console.log('getData results', result.data.results);
  };

  // I spent the most time of the project right here. Getting the 'right' values from the Material Ui Autocomplete took me a hot minute.
  const onChange = (e?: any, values?: any) => {
    // Here I needed to set the input to the value of the dietary intolerance. The value had commas between the multiple inputs. I had to remove the commas and the Spoonacular documentation required me to add a "+" after every input that followed.
    setInput(values.toString().replace(/,/g, '+'));
    // After the values are set the getData() function get called with filled out url/API request
    getData();
    // I noticed that although the url came back with the right request and structure the data shown was not always correct and might be a little buggy. Maybe I'm requesting too much recipes as they are now limited to 100. I might be missing and I may have introduced a bug somewhere that I do not not of.
    e.preventDefault();
    console.log('log the onchange values', values);
  };
  return (
    <AppWrapper>
      <AppHeader>
        {/* If I had more time I would have made the html below its separate and tidy component  */}
        <h1>Recipe'nt</h1>
        <h2>
          Search for recipes that accommodate your dietary intolerances &
          restrictions.
        </h2>
        <p>
          Disclaimer: Please note that the list of recipes is automatically
          generated and we can not guarantee 100% accuracy. If your dietary
          needs may cause a life threatening situation, please read the recipe
          carefully and contact a licensed dietitian before consuming.
        </p>
      </AppHeader>
      <SearchWrapper>
        <Autocomplete
          multiple
          id="tags-standard"
          // Here I import the json data with the dietary intolerances
          options={intolerances}
          // Because the intolerances don't have a label, getOptionLabel is left to option
          getOptionLabel={(option) => option}
          // Triggers the onChange function
          onChange={onChange}
          renderInput={(params) => (
            // And the text field render parameters
            <TextField
              {...params}
              variant="standard"
              label="You can search for multiple dietary restrictions"
              placeholder="Dietary Intolerances"
            />
          )}
        />
      </SearchWrapper>

      <RecipeGrid>
        {/* This looks through the recipes if there are recipes and not empty a list of recipes will be shown via a map function */}
        {recipes !== [] &&
          recipes.map((recipe: any) => (
            <RecipeCard
              // List of recipe props
              recipeKey={recipe.id}
              // The api only shows the relative image url with no base url in the API. This had to be solved by combining the base url with Spoonacular's image url
              recipeImage={`https://spoonacular.com/recipeImages/${recipe.image}`}
              recipeImageAlt={recipe.title}
              recipeTitle={recipe.title}
              recipeServings={recipe.servings}
              recipeTime={recipe.readyInMinutes}
              // Recipes go to an outside url
              recipeLink={recipe.sourceUrl}
            />
          ))}
      </RecipeGrid>
    </AppWrapper>
  );
};

export default App;
