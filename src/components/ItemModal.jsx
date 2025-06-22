import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // 📦 carousel styles

function ItemModal({ item, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white max-w-xl w-full p-4 rounded shadow relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-gray-600 text-2xl font-bold"
                >
                    &times;
                </button>

                {/* Title */}
                <h3 className="text-2xl font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.type}</p>

                {/* Description */}
                <p className="mb-4">{item.description}</p>

                {/* 🎠 Carousel */}
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={true}
                    infiniteLoop
                    autoPlay
                    interval={3000}
                    dynamicHeight={true}
                    emulateTouch={true}
                    stopOnHover={true}
                >
                    {[item.coverImage, ...item.additionalImages].map((img, idx) => (
                        <div key={idx}>
                            <img
                                src={img}
                                alt={`item-img-${idx}`}
                                className="object-cover h-64 w-full rounded"
                            />
                        </div>
                    ))}
                </Carousel>


                {/* Enquire Button */}
                <button
                    onClick={() => alert("Enquiry sent (to be implemented)")}
                    className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Enquire
                </button>
            </div>
        </div>
    );
}

export default ItemModal;
