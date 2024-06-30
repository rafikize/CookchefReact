import styles from "./Recipe.module.scss";
import { useContext } from "react";
import { ApiContext } from "./../../../../context/ApiContext";

function Recipe({ recipe: { _id, liked, title, image }, toggleLikedRecipe }) {
  const BASE_URL_API = useContext(ApiContext);

  async function handleClick() {
    try {
      const response = await fetch(`${BASE_URL_API}/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liked: !liked }),
      });
      if (response.ok) {
        const updatedRecipe = await response.json();
        toggleLikedRecipe(updatedRecipe);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div onClick={handleClick} className={styles.recipe}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-10">{title}</h3>
        <i className={`fa-solid fa-heart ${liked ? "text-primary" : ""}`}></i>
      </div>
    </div>
  );
}

export default Recipe;
