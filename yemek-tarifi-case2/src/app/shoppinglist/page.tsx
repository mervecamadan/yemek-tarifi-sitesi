"use client";

import React, { useEffect, useState } from "react";

interface ShoppingListItem {
    recipeName: string;
    ingredient: string;
    checked: boolean;
}

const ShoppingList = () => {
    const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);

    useEffect(() => {
        const savedList: ShoppingListItem[] = JSON.parse(
            localStorage.getItem("shoppingList") || "[]"
        ).map((item: ShoppingListItem) => ({
            ...item,
            checked: item.checked || false,
        }));
        setShoppingList(savedList);
    }, []);

    const handleClearList = () => {
        localStorage.removeItem("shoppingList");
        setShoppingList([]);
    };

    const handleToggleChecked = (recipeName: string, ingredient: string) => {
        const updatedList = shoppingList.map((item) =>
            item.recipeName === recipeName && item.ingredient === ingredient
                ? { ...item, checked: !item.checked }
                : item
        );

        setShoppingList(updatedList);
        localStorage.setItem("shoppingList", JSON.stringify(updatedList));
    };

    const groupedShoppingList = shoppingList.reduce((acc, item) => {
        if (!acc[item.recipeName]) {
            acc[item.recipeName] = [];
        }
        acc[item.recipeName].push(item);
        return acc;
    }, {} as Record<string, ShoppingListItem[]>);

    return (
        <div className="max-w-3xl mx-auto p-20 mt-2">
            <h1 className="text-2xl font-bold text-center">Shopping List</h1>

            {Object.keys(groupedShoppingList).length > 0 ? (
                <div className="mt-6">
                    {Object.entries(groupedShoppingList).map(([recipeName, items], index) => (
                        <div key={index} className="mb-6">
                            <h2 className="text-xl font-bold">{recipeName}</h2>
                            <ul className="mt-2 ml-6">
                                {items.map((item, idx) => (
                                    <li key={idx} className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            checked={!!item.checked}
                                            onChange={() =>
                                                handleToggleChecked(recipeName, item.ingredient)
                                            }
                                            className="mr-2"
                                        />
                                        <span
                                            className={item.checked ? "line-through text-gray-500" : ""}
                                        >
                                            {item.ingredient}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center mt-6">Your shopping list is empty.</p>
            )}

            {shoppingList.length > 0 && (
                <button
                    onClick={handleClearList}
                    className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                    Clear Shopping List
                </button>
            )}
        </div>
    );
};

export default ShoppingList;
