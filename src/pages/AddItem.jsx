import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddItem() {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        description: "",
        coverImage: "",
        additionalImages: [],
    });

    const [success, setSuccess] = useState(false);
    const [coverPreview, setCoverPreview] = useState("");
    const [additionalPreviews, setAdditionalPreviews] = useState([]);

    const navigate = useNavigate();

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleChange = async (e) => {
        const { name, value, files } = e.target;

        if (name === "coverImage") {
            const file = files[0];
            const base64 = await toBase64(file);
            setFormData((prev) => ({ ...prev, coverImage: base64 }));
            setCoverPreview(URL.createObjectURL(file));
        } else if (name === "additionalImages") {
            const filesArray = Array.from(files);
            const base64Images = await Promise.all(filesArray.map(toBase64));

            setFormData((prev) => ({
                ...prev,
                additionalImages: [...prev.additionalImages, ...base64Images],
            }));

            setAdditionalPreviews((prev) => [
                ...prev,
                ...filesArray.map((file) => URL.createObjectURL(file)),
            ]);

            // Clear input so user can re-select same files
            e.target.value = "";
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const items = JSON.parse(localStorage.getItem("items")) || [];
        items.push(formData);
        localStorage.setItem("items", JSON.stringify(items));

        setSuccess(true);
        setTimeout(() => navigate("/view-items"), 1500);
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Add New Item
            </h2>

            {success && (
                <p className="text-green-600 font-medium mb-2 text-center">
                    ✅ Item successfully added!
                </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    required
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Item Type (e.g. Shirt, Shoes)"
                    required
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <textarea
                    name="description"
                    placeholder="Item Description"
                    required
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <label className="text-sm text-gray-600 font-semibold">
                    Cover Image
                </label>
                <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    required
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                {coverPreview && (
                    <img
                        src={coverPreview}
                        alt="Cover Preview"
                        className="w-40 h-40 object-cover mt-2 rounded"
                    />
                )}

                <label className="text-sm text-gray-600 font-semibold">
                    Additional Images
                </label>
                <input
                    type="file"
                    name="additionalImages"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <small className="text-gray-500">
                    Hold Ctrl (or Cmd) while selecting to choose multiple images
                </small>

                {additionalPreviews.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {additionalPreviews.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Preview ${index + 1}`}
                                className="w-20 h-20 object-cover rounded"
                            />
                        ))}
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Add Item
                </button>
            </form>
        </div>
    );
}

export default AddItem;
