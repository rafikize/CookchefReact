import { useEffect, useState } from "react";
import { getRecipes } from "../apis";

export function useFetchRecipes(url, page) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);

  useEffect(() => {
    let cancel = false;
    async function fetchData() {
      try {
        setIsLoading(true);
        const queryParam = new URLSearchParams();
        if (page) {
          queryParam.append("limit", 50);
          queryParam.append("skip", (page - 1) * 50);
          queryParam.append("sort", "createdAt:desc");
        }
        const fatchedRecipes = await getRecipes(queryParam);
        setRecipes(fatchedRecipes);
      } catch (e) {
        setError("Erreur");
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }
    fetchData();
    return () => (cancel = true);
  }, [page]);

  return [[recipes, setRecipes], isLoading, error];
}
