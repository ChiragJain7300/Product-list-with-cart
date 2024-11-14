import React, { useEffect, useState, useR } from "react";

const FoodCard = ({ foodItem = {}, order, setOrder }) => {
  const isMobile = window.innerWidth < 630 ? true : false;

  const [orderQty, setOrderQty] = useState(0);
  const decQty = (id) => {
    // Clone the current order to avoid direct mutation
    const updatedOrder = [...order];
    const existingOrderItem = updatedOrder.find((item) => item.id === id);
    if (!existingOrderItem) return; // Exit if item does not exist

    // Check if quantity is 1, so we can remove the item
    if (existingOrderItem.orderQty === 1) {
      setOrderQty(0);
      setOrder(updatedOrder.filter((item) => item.id !== id));
    } else {
      // Otherwise, decrement the quantity
      existingOrderItem.orderQty -= 1;
      setOrder(updatedOrder);
    }
  };
  const addToCart = (id) => {
    // Clone the current order to avoid direct mutation
    const updatedOrder = [...order];
    const existingOrderItem = updatedOrder.find((item) => item.id === id);

    if (existingOrderItem) {
      // Update quantity if item already exists
      existingOrderItem.orderQty += 1;
    } else {
      // Add new item if it doesn't exist
      updatedOrder.push({ id, orderQty: 1 });
    }

    // Update the state with the new order array
    setOrder(updatedOrder);
  };
  useEffect(() => {
    const updatedOrder = [...order];
    const existingOrderItem = updatedOrder.find(
      (item) => item.id === foodItem.id
    );
    if (existingOrderItem) setOrderQty(existingOrderItem.orderQty);
    else setOrderQty(0);
  }, [order, setOrder]);
  return (
    <div className="w-72 sm:w-64 rounded-lg relative " key={foodItem.id}>
      <img
        src={isMobile ? foodItem.image.mobile : foodItem.image.desktop}
        alt="foodItem-image-desktop"
        className={`rounded-lg mb-5 sm:mb-9 ${
          orderQty > 0 ? "border-4 border-Red" : " "
        }`}
      />
      {orderQty > 0 ? (
        <div className="rounded-full px-4 py-2 flex w-[155px] justify-between absolute left-16 top-[160px] sm:left-12 sm:top-[220px] gap-3 items-center bg-Red">
          <button
            onClick={() => decQty(foodItem.id)}
            className="border border-white rounded-full px-1 py-2 hover:bg-white"
          >
            <img
              src="/images/icon-decrement-quantity.svg"
              alt="icon-decrement-quantity.svg"
            />
          </button>
          <span className="text-lg font-bold text-white">{orderQty}</span>
          <button
            onClick={() => addToCart(foodItem.id)}
            className="border border-white rounded-full p-1 hover:bg-white"
          >
            <img
              src="/images/icon-increment-quantity.svg"
              alt="icon-increment-quantity.svg"
            />
          </button>
        </div>
      ) : (
        <button
          className="rounded-full px-6 py-3 flex bg-white gap-2 justify-center absolute left-16 top-[160px] sm:left-12 sm:top-[220px]"
          onClick={() => addToCart(foodItem.id)}
        >
          <img src="/images/icon-add-to-cart.svg" alt="icon-add-to-cart" />
          <span className="text-md font-bold">Add to Cart</span>
        </button>
      )}

      <p className="text-gray-500">{foodItem.category}</p>
      <p className="font-bold text-md">{foodItem.name}</p>
      <p className="text-Red font-bold text-lg">${foodItem.price.toFixed(2)}</p>
    </div>
  );
};

export default FoodCard;
