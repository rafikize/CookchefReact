import styles from './RecipeForm.module.scss';

function RecipeForm(){
    return (
        <form className={`d-flex flex-column card p-20 ${styles.recipeForm}`}>
            <h2 className="mb-20">Ajouter une recette</h2>
           <div>
            <button className='btn btn-primary'>Souvgarder</button>
           </div>
        </form>
    )
}

export default RecipeForm;