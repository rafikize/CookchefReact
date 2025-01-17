import { useState, useContext } from "react";
import { ApiContext } from "../../context/ApiContext";
import styles from "./HomePage.module.scss";
import Recipe from "./components/Recipe/Recipe";
import Loading from "../../components/Loading/Loading";
import Search from "./components/Search/Search";
import { useFetchRecipes } from "./../../hooks/useFetchRecipes";

export default function HomePage() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const BASE_URL_API = useContext(ApiContext);
  const [[recipes, setRecipes], isLoading] = useFetchRecipes(page);

  async function updateRecipe(updatedRecipe) {
    try {
      const { _id, ...restRecipe } = updatedRecipe;
      const response = await fetch(`${BASE_URL_API}/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restRecipe),
      });
      if (response.ok) {
        const updatedRecipe = await response.json();
        setRecipes(
          recipes.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
        );
      }
    } catch (err) {
      console.error("ERREUR maj recette");
    }
  }

  async function deleteRecipe(_id) {
    try {
      const response = await fetch(`${BASE_URL_API}/${_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRecipes(recipes.filter((r) => r._id !== _id));
      }
    } catch (e) {
      console.log("ERREUR suppression recette");
    }
  }

  return (
    <div className="flex-fill container d-flex flex-column p-20">
      <h1 className="my-30">
        Découvrez nos nouvelles recettes{" "}
        <small className={styles.small}>- {recipes.length}</small>
      </h1>
      <div
        className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
      >
        <Search setFilter={setFilter} />
        {isLoading && !recipes.length ? (
          <Loading />
        ) : (
          <div className={styles.grid}>
            {recipes
              .filter((r) => r.title.toLowerCase().startsWith(filter))
              .map((r) => (
                <Recipe
                  key={r._id}
                  recipe={r}
                  updateRecipe={updateRecipe}
                  deleteRecipe={deleteRecipe}
                />
              ))}
          </div>
        )}
        <div className="d-flex flex-row justify-content-center align-items-center p-20">
          <button onClick={() => setPage(page + 1)} className="btn btn-primary">
            Charger plus de recettes
          </button>
        </div>
      </div>
    </div>
  );
}
