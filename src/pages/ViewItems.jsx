import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react"; // 👈 Icon
import ItemModal from "../components/ItemModal";

function ViewItems() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("items")) || [];
        setItems(storedItems);
    }, []);

    const handleDelete = (indexToDelete) => {
        const updatedItems = items.filter((_, index) => index !== indexToDelete);
        localStorage.setItem("items", JSON.stringify(updatedItems));
        setItems(updatedItems);
    };

    const handleDeleteAll = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete all items?");
        if (confirmDelete) {
            localStorage.removeItem("items");
            setItems([]);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">View Items</h2>

                {/* Delete All Button */}
                {items.length > 0 && (
                    <button
                        onClick={handleDeleteAll}
                        className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                    >
                        <Trash2 size={16} />
                        Delete All
                    </button>
                )}
            </div>

            {items.length === 0 ? (
                <p>No items added yet. Go to "Add Item" page to add some!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="relative border rounded shadow hover:shadow-md"
                        >
                            <img
                                src={item.coverImage}
                                alt={item.name}
                                className="w-full h-40 object-cover rounded-t cursor-pointer"
                                onClick={() => setSelectedItem(item)}
                            />
                            <div className="p-2">
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-sm text-gray-600">{item.type}</p>
                            </div>

                            {/* 🗑 Trash Icon for Delete */}
                            <button
                                onClick={() => handleDelete(index)}
                                title="Delete Item"
                                className="absolute top-2 right-2 bg-white border rounded-full p-1 hover:bg-red-100"
                            >
                                <Trash2 size={18} className="text-red-600" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for Item Details */}
            {selectedItem && (
                <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </div>
    );
}

export default ViewItems;
