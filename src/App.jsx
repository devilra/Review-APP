import { Star } from "lucide-react";
import React from "react";
import { useState } from "react";

const App = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9LGhWTS2P37A1N_oQB6uK3BZGnOfsD7pR2A&s",
      description: "High-quality wireless headphones with noise cancellation.",
      reviews: [
        {
          user: "Alice",
          rating: 5,
          comment: "Amazing sound quality and battery life!",
        },
        {
          user: "Bob",
          rating: 4,
          comment: "Very comfortable but a bit pricey.",
        },
      ],
    },
    {
      id: 2,
      name: "Smartphone",
      photo:
        "https://samsungmobilepress.com/file/FC05AE750AD6EB0673D9E9D4C157D4FDCA91C0319D37B2827A4ACC850D3D124959298BB89A1D18EEB9531CE7B6BDB56BB43890C99A07EF46FFD865333FEC385C3A4ECDA52E32E217D32C2807BAAF403A9124FE24BD2AD9F141EA995A91D14E9095EC253173B6A26FE1DB745A586CC1ADDE7D6D440FA45C94CA365A5CF1A540E7",
      description: "Latest smartphone with advanced features and sleek design.",
      reviews: [
        {
          user: "Charlie",
          rating: 5,
          comment: "Super fast and the camera is excellent!",
        },
        {
          user: "Dana",
          rating: 3,
          comment: "Good performance but heats up during gaming.",
        },
      ],
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [newReview, setNewReview] = useState({
    user: "",
    rating: 0,
    comment: "",
  });

  const handleAddReview = () => {
    if (newReview.user || newReview.rating || newReview.comment) {
      const updateProduct = {
        ...selectedProduct,
        reviews: [...selectedProduct.reviews, newReview],
      };
      console.log(updateProduct);
      const updateProducts = products.map((product) =>
        product.id === updateProduct.id ? updateProduct : product
      );
      setSelectedProduct(updateProduct);
      setNewReview({ user: "", rating: 0, comment: "" });
    } else {
      alert("please all fields required");
    }
  };

  const handleSelectedProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <nav className="bg-neutral-800 text-white text-center font-mono p-5">
        <h1 className="text-xl lg:text-3xl "> Product Review</h1>
      </nav>
      <div className="flex flex-col items-center justify-center w-full md:p-4 mt-5">
        <div className="grid grid-cols-2 ">
          {products.map((product) => (
            <div
              key={product.id}
              className={`rounded-lg shadow-md cursor-pointer hover:opacity-90  mx-5 border border-slate-500 ${
                selectedProduct.id === product.id
                  ? "border-[1px] border-rose-600"
                  : ""
              }`}
              onClick={() => handleSelectedProduct(product)}
            >
              <div className="mx-3">
                <img
                  className={`h-36 md:h-52  object-cover md:p-5 p-2 `}
                  src={product.photo}
                  alt={product.name}
                />
                <h3 className="text-[12px] truncate text-center md:text-left md:text-xl md:pb-3 font-semibold pb-2">
                  {product.name}
                </h3>
                <p className="p-3 text-[13px] text-gray-600 md:p-0 md:py-2 font-mono">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-slate-100 rounded min-w-[350px] md:w-full shadow-lg  p-2 mt-5 mx-5 md:p-6  ">
          <h1 className="text-[12px] md:text-xl font-semibold font-sans">
            Reviews for :
            <span className="px-2 text-[10px] md:text-[15px] text-neutral-600 font-mono tracking-[1px]">
              {selectedProduct.name}
            </span>
          </h1>
          {selectedProduct.reviews.length > 0 ? (
            selectedProduct.reviews.map((review, index) => (
              <div key={index} className="mb-4 border-b pb-2 mt-2">
                <div className="flex items-center mb-2">
                  {Array(review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500" />
                    ))}
                </div>
                <p className="text-sm">
                  <strong className="px-2">{review.user}:</strong>
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <p>No Reviews current product</p>
          )}
          <div className="mt-4">
            <h1 className="text-[14px] md:text-[16px] mb-2 md:text-left text-purple-500 underline text-center font-sans font-semibold">
              Add Your Review
            </h1>
            <input
              type="text"
              className="w-full border block md:w-[400px] my-2 md:my-4 border-neutral-800 rounded p-2"
              placeholder="your name"
              value={newReview.user}
              onChange={(e) =>
                setNewReview({ ...newReview, user: e.target.value })
              }
            />
            <input
              type="number"
              value={newReview.rating}
              className="w-full border block md:w-[400px] md:my-4 my-2 border-neutral-800 rounded p-2"
              placeholder="your name"
              onChange={(e) =>
                setNewReview({
                  ...newReview,
                  rating: Math.min(5, Math.max(1, +e.target.value)),
                })
              }
            />
            <textarea
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              placeholder="your comment"
              value={newReview.comment}
              className="w-full border block md:w-[400px] md:my-4 my-2 border-neutral-800 rounded p-2"
            />
            <button
              onClick={handleAddReview}
              className="w-full bg-purple-100 text-indigo-600 font-bold hover:bg-purple-200  font-mono  border block md:w-[400px] md:my-4 my-4 border-purple-800 rounded-md p-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
