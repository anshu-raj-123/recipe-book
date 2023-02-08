import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Recipe from "./Recipe";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";


function App() {
  const APP_ID = "3afe9f27";
  const APP_KEY = "ab4a0eab86045195990e864d53f87d55";
  const { loginWithRedirect } = useAuth0();
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const { user, isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    getRecipe();
  }, [query]);
  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setRecipes(response.data.hits);
    console.log(response.data.hits);
  };
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
  };
  return (
    <div >
      <Paper
        onSubmit={updateQuery}
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", margin: '10px auto', width: 400 }}
      >
        <InputBase
          type="text"
          value={search}
          onChange={updateSearch}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Recipe"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      

        {isAuthenticated?(
          <IconButton onClick={() => logout({returnTo: window.location.origin})}> Log Out </IconButton>
          ):
          (
          <IconButton onClick={() => loginWithRedirect()}> Log In </IconButton>
        )}
      </Paper>
      <div style={{margin:'10px'}}>
      <Grid container>
      {recipes.map((recipe) => (
        <Grid xs={3}>
        <Recipe
        key = {recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      </Grid>
      ))}
      </Grid>
      </div>
    </div>
  );
}

export default App;
