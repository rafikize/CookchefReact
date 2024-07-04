const RECIPE_API = "https://restapi.fr/api/recipes";

export async function getRecipes(queryParam) {
  const response = await fetch(
    `${RECIPE_API}${queryParam ? `?${queryParam}` : ""}`
  );
  if (response.ok) {
    const body = await response.json();
    return Array.isArray(body) ? body : [body];
  } else {
    throw new Error("Une erreur est survenue");
  }
}

// export async function getRecipe(_id) {}

// export async function deleteRecipe(_id) {}

// export async function updateRecipe(updateRecipe) {}

// export async function createRecipe(newRecipe) {}
