import React, { useEffect, useState } from "react";
import foodData from "../../data";

const Cart = ({ order, setOrder }) => {
  const [orderTotal, setOrderTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const getFoodDetail = (id) => {
    const food = foodData.find((item) => item.id === id);
    return food;
  };
  const deleteOrderEntry = (id) => {
    const oldOrder = [...order];
    setOrder(oldOrder.filter((item) => item.id !== id));
  };
  const showModal = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    if (order.length > 0) {
      let sum = 0;
      order.map((item) => {
        sum += getFoodDetail(item.id).price * item.orderQty;
      });
      setOrderTotal(sum);
    }
  }, [order]);
  return (
    <>
      <div>
        <div className="mb-5">
          {order?.map((item) => (
            <div className="flex justify-between items-center border-b-2 border-Rose-100 py-2">
              <div>
                <p className="font-bold">{getFoodDetail(item.id).name}</p>
                <div className="flex gap-2 items-center">
                  <span className="text-Red font-bold text-sm">
                    {item.orderQty}x
                  </span>
                  <span className="text-gray-400">
                    @{getFoodDetail(item.id).price.toFixed(2)}
                  </span>
                  <span>
                    ${(getFoodDetail(item.id).price * item.orderQty).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                className="border-2 border-Rose-400 p-0.5 rounded-full"
                onClick={() => deleteOrderEntry(item.id)}
              >
                <img
                  src="/images/icon-remove-item.svg"
                  alt="icon-remove-item"
                />
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-5">
          <p>Order total</p>
          <span className="text-2xl font-bold">${orderTotal.toFixed(2)}</span>
        </div>
        <div className="w-full p-3 bg-Rose-100 flex gap-2 justify-center mb-5">
          <img
            src="/images/icon-carbon-neutral.svg"
            alt="icon-carbon-neutral"
            className="w-5"
          />
          <span className="text-sm">
            This is a <span className="font-bold">carbon-neutral</span> delivery
          </span>
        </div>
        <button
          className="w-full bg-Red text-white p-3 rounded-full font-bold"
          onClick={showModal}
        >
          Confirm Order
        </button>
      </div>
      {isOpen ? (
        <div className="w-full h-full z-10 fixed top-0 left-0 flex justify-center items-center bg-gray-500 bg-opacity-25">
          {/* Modal Compoenent  */}
          <div className="bg-white p-5 rounded-lg flex flex-col w-full md:w-[480px]">
            <img
              src="/images/icon-order-confirmed.svg"
              alt="icon-order-confirmed"
              className="w-12 mb-5"
            />
            <h1 className="text-black text-3xl font-bold">Order Confirmed</h1>
            <p className="text-md text-Rose-400 mb-4">
              We hope you enjoy your food
            </p>
            <div>
              {order?.map((item) => (
                <div className="flex p-4 gap-3 bg-Rose-100 items-center">
                  <img
                    src={getFoodDetail(item.id).image.thumbnail}
                    alt={item.id}
                    className="w-16"
                  />
                  <div className="flex-1">
                    <h1>{getFoodDetail(item.id).name}</h1>
                    <div className="flex gap-3">
                      <span className="text-Red font-bold">
                        {item.orderQty}x
                      </span>
                      <span className="text-Rose-400">
                        @{getFoodDetail(item.id).price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <p className="font-bold">
                    ${(getFoodDetail(item.id).price * item.orderQty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex p-5 gap-3 bg-Rose-100 items-center justify-between mb-4">
              <p className="text-Rose-500">Order total</p>
              <p className="text-2xl font-bold">${orderTotal.toFixed(2)}</p>
            </div>
            <button
              className="w-full rounded-full bg-Red text-white p-3 font-bold"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Start new order
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Cart;
