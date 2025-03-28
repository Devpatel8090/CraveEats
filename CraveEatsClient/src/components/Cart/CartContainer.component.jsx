import React, { useState, useEffect } from "react";
import {
    IoMdArrowDropdown,
    IoMdArrowDropright,
    IoMdArrowDropup,
} from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// component
import FoodItem from "./FoodItem.component";

// redux
import { useSelector, useDispatch } from "react-redux";


function CartSM({ toggle }) {
    const reduxState = useSelector((globalState) => globalState.cart.cart);
    const navigate = useNavigate();
    console.log(navigate);
    const continueToCheckout = () => navigate("/checkout/orders");
    return (
        <>
            <div className="md:hidden flex items-center justify-between">
                <div className="flex flex-col items-start">
                    <small className="flex items-cetner gap-1 text-CraveEats-500" onClick={toggle}>
                        {reduxState.length} Item <IoMdArrowDropup />
                    </small>
                    <h4 className="text-CraveEats-500">
                        ${reduxState.reduce((acc, curVal) => acc + curVal.totalPrice, 0)} <sub>(plus tax)</sub>
                    </h4>
                </div>
                <button
                    onClick={continueToCheckout}
                    className="flex items-center gap-1 bg-CraveEats-400 px-3 py-1 text-white rounded-lg">
                    Continue <IoMdArrowDropright />
                </button>
            </div>
        </>
    );
}

function CartLG({ toggle }) {
    const reduxState = useSelector((globalState) => globalState.cart.cart);
    const navigate = useNavigate();
    console.log(navigate);
    const continueToCheckout = () => navigate("/checkout/orders");

    return (
        <>
            <div className="hidden md:flex items-center justify-between">
                <div className="flex flex-col items-start">
                    <small className="flex items-center gap-1 text-CraveEats-500" onClick={toggle}>
                        {reduxState.length} Item <IoMdArrowDropup />
                    </small>
                    <h4 className="text-CraveEats-500">
                        ${reduxState.reduce((acc, curVal) => acc + curVal.totalPrice, 0)}{" "} <sub>(plus tax)</sub>
                    </h4>
                </div>
                <button
                    onClick={continueToCheckout}
                    className="flex items-center gap-1 bg-CraveEats-400 px-3 py-1 text-white rounded-lg">
                    Continue <IoMdArrowDropright />
                </button>
            </div>
        </>
    );
}

function CartContainer() {
    const [isOpen, setIsOpen] = useState(false);
    // const [cartData, setCartData] = useState([]);
    // const [foods, setFoods] = useState([
    //     {
    //         image:
    //             "https://b.zmtcdn.com/data/dish_photos/87c/153beb91af9f43e157f3d6fd6ea2587c.jpg?output-format=webp",
    //         name: "Chilli Paneer Gravy",
    //         price: "157.50",
    //         rating: 4,
    //         descript:
    //             "Chicken NoodelsChicken Fried Rice+Chilli ChickenChicken Manchurian+Chilli PotatoHoney Chilli Potato+Chicken Chilli Garlic Momos [2 ... read more",
    //         quantity: 1,
    //     },
    //     {
    //         image:
    //             "https://b.zmtcdn.com/data/dish_photos/87c/153beb91af9f43e157f3d6fd6ea2587c.jpg?output-format=webp",
    //         name: "Chilli Paneer Gravy",
    //         price: "157.50",
    //         rating: 4,
    //         descript:
    //             "Chicken NoodelsChicken Fried Rice+Chilli ChickenChicken Manchurian+Chilli PotatoHoney Chilli Potato+Chicken Chilli Garlic Momos [2 ... read more",
    //         quantity: 1,
    //     },
    // ]);
    const reduxState = useSelector((globalState) => globalState.cart.cart);

    const toggleCart = () => setIsOpen((prev) => !prev);
    const closeCart = () => setIsOpen(false);

    return (
        <>
            {reduxState.length && (
                <>
                    {isOpen && (
                        <div className="fixed w-full overflow-y-scroll h-48 bg-white z-10 p-2 bottom-14 px-3">
                            <div className="flex items-center justify-between md:px-20">
                                <h3 className="text-xl font-semibold text-CraveEats-500">Your Orders</h3>
                                <IoCloseSharp className="text-CraveEats-500" onClick={closeCart} />
                            </div>

                            <hr className="my-2" />

                            <div className="flex flex-col gap-2 md:px-20">
                                {reduxState.map((food) => (
                                    <FoodItem key={food._id} {...food} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="fixed w-full bg-white z-10 p-2 px-3 bottom-0  mx-auto lg:px-20">
                        <CartSM toggle={toggleCart} />
                        <CartLG toggle={toggleCart} />
                    </div>
                </>
            )}
        </>
    );
}

export default CartContainer;