import { useState } from "react";
import foodData from "../data";
import FoodCard from "./components/FoodCard";
import Cart from "./components/Cart";

function App() {
  const [order, setOrder] = useState([]);
  return (
    <>
      <main className="w-full min-h-screen bg-Rose-100 py-16 text-black font-RedHat">
        <div className="max-w-7xl w-5/6 mx-auto flex flex-col sm:flex-row sm:items-start items-center gap-5">
          {/* List of Items */}
          <div className="flex flex-col gap-5 flex-1">
            <h1 className="text-black text-3xl font-bold text-center md:text-left">
              Desserts
            </h1>
            <div className="flex gap-5 flex-wrap justify-center md:justify-normal">
              {foodData.map((item) => (
                <FoodCard foodItem={item} order={order} setOrder={setOrder} />
              ))}
            </div>
          </div>
          {/* cart section */}
          <div className="w-80 bg-white rounded-md p-5">
            <h1 className="text-2xl font-bold text-Red mb-2">
              Your Cart ({order.length})
            </h1>
            {order.length === 0 ? (
              <>
                <img
                  src="/images/illustration-empty-cart.svg"
                  alt="illustration-empty-cart"
                  className="w-64 mx-auto"
                />
                <p className="text-Rose-500 text-sm text-center font-bold">
                  Your added items will appear here
                </p>
              </>
            ) : (
              <Cart order={order} setOrder={setOrder} />
            )}
          </div>
        </div>
      </main>

      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </div>
    </>
  );
}

export default App;
