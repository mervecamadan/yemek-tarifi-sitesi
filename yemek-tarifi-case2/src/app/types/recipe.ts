export interface Recipe {
    id: number;
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    image: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    rating?: number;
}
