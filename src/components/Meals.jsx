
import uesHttp from "../hooks/useHttp"
import MealItem from "./MealItem"
import Error from "./Error";


const requestConfig = {}

export default function Meals() {

    const { data: loadedMeals, isLoading, error } = uesHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p className="center">Featching meals...</p>
    }

    if (error) {
        return <Error title="Faild to fetch meals" message={error} />
    }

    return (
        <ul id="meals">{loadedMeals.map(meal => <MealItem key={meal.id} meal={meal}></MealItem>)}</ul>
    )
}