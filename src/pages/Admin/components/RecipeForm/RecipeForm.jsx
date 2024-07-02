import styles from "./RecipeForm.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { ApiContext } from './../../../../context/ApiContext';

function RecipeForm() {
const BASE_URL = useContext(ApiContext);

  const defaultValues = {
    title: "",
    image: "",
  };

  const recipeSchema = yup.object({
    title: yup
      .string()
      .required("Le titre est obligatoire")
      .min(10, "Le titre doit contenir au moins 10 caractères")
      .max(30, "Le titre doit contenir au maximum 30 caractères"),
    image: yup
      .string()
      .required("L'image est obligatoire")
      .url("L'image doit être une URL valide"),
  });

  const {
    formState: { errors, isSubmiting },
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
  } = useForm({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });

  async function onSubmit(values) {
    try {
        clearErrors();
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        if (response.ok) {
            reset(defaultValues);
            alert("La recette a bien été ajoutée");
        }else{ 
            setError("generic", {
                type: "generic",
                message: "Une erreur s'est produite, veuillez réessayer",
            });
        }
    } catch (error) {
         setError("generic", {
            type: "generic",
            message: "Une erreur s'est produite, veuillez réessayer",
        });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`d-flex flex-column card p-20 ${styles.recipeForm}`}
    >
      <h2 className="mb-20">Ajouter une recette</h2>
      <div className="d-flex flex-column mb-20">
        <label>Titre de la recette</label>
        <input {...register("title")} type="text" />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>
      <div className="d-flex flex-column mb-20">
        <label>Image pour la recette</label>
        <input {...register("image")} type="text" />
        {errors.image && <p className="form-error">{errors.image.message}</p>}
      </div>
      {errors.generic && <p className="form-error">{errors.generic.message}</p>}
      <div>
        <button disabled={isSubmiting} className="btn btn-primary">
          Souvgarder
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;
