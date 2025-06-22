import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import emailjs from "@emailjs/browser";

function ItemModal({ item, onClose }) {
    const handleEnquire = () => {
        const templateParams = {
            item_name: item.name,
            item_type: item.type,
            description: item.description,
        };

        emailjs
            .send(
                "service_4uw135k",
                "template_fuafgu3",
                templateParams,
                "7LFOIFO2A_ElO1B2n"
            )
            .then(() => {
                alert("Enquiry email sent successfully!");
            })
            .catch((err) => {
                console.error("Email send error:", err);
                alert("Failed to send enquiry email.");
            });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white max-w-xl w-full p-4 rounded shadow relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-gray-600 text-2xl font-bold"
                >
                    &times;
                </button>

                <h3 className="text-2xl font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.type}</p>
                <p className="mb-4">{item.description}</p>

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

                <button
                    onClick={handleEnquire}
                    className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Enquire
                </button>
            </div>
        </div>
    );
}

export default ItemModal;
