import { useState, useEffect } from "react";
import "./AvailableMeals.css";
import Card from "../../UI/Card";
import MealItem from "../MealItem/MealItem";

const AvailableMeals = () => {
    const [food, setFood] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFoodHandler = async () => {
            setIsLoading(true);
            setError(null);
            fetch(
                "https://react-meals-41662-default-rtdb.firebaseio.com/DUMMY_MEALS.json?auth=UdCBnM1guUHaZjwXcth30DVhlYl3IgohlN6l1aNS"
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    const loadedMeal = [];
                    for (const key in data) {
                        loadedMeal.push({
                            id: key,
                            name: data[key].name,
                            description: data[key].description,
                            price: data[key].price,
                        });
                        setFood(loadedMeal);
                        setIsLoading(false);
                    }
                }).catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });;
        };
        fetchFoodHandler();
    }, []);
    let content = <h3></h3>;
    if (isLoading) {
        content = <h3>Please wait loading...</h3>;
    }
    if (error) {
        content = <h3>Something went wrong...</h3>;
    }
    const mealsList = food.map((meal) => {
        return (
            <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                price={meal.price}
                description={meal.description}
            />
        );
    });
    return (
        <section className="meals">
            <Card>
                <ul>{mealsList}</ul>
                {content}
            </Card>
        </section>
    );
};
export default AvailableMeals;
