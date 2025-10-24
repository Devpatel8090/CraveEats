import React, { useState, useEffect } from "react";
import { BsShieldLockFill } from "react-icons/bs";

// components
import FoodItem from "../components/Cart/FoodItem.component";
import AddressList from "../components/CheckOut/AddressList.component";
// import CheckoutForm from "../components/CheckOut/CheckOutForm.component";

import { useSelector } from "react-redux";


// // razorpay
// import Razorpay from "razorpay";



// Redux
import { useDispatch } from "react-redux";
import { getSpecificRestaurant } from "../redux/reducers/restaurant/restaurant.actions";


// stripes
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";



function CheckoutPage() {
    const address = [
        {
            name: "Home",
            address: "123 Main St",
        },
        {
            name: "Work",
            address: "123 Main St",
        },
        {
            name: "Other",
            address: "123 Main St",
        },
    ];

    const reduxStateCart = useSelector((globalState) => globalState.cart.cart);
    const reduxStateUser = useSelector(
        (globalState) => globalState.user.user.user
    );
    console.log(reduxStateCart);
    const totalAmount = reduxStateCart.reduce((total, current) => total + current.totalPrice, 0);

    const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000/payment";
    const makePayment = async () => {
        // Load Stripe with public key
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

        const body = {
            products: reduxStateCart
        }
        const headers = {
            "Content-Type": "application/json"
        }

        const response = await fetch(`${apiURL}/checkout`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        })


        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        })
    }


    // const stripe = useStripe();
    // const elements = useElements();

    // const handlePayment = async (event) => {
    //     event.preventDefault();

    //     if (!stripe || !elements) return;

    //     const { error, paymentMethod } = await stripe.createPaymentMethod({
    //         type: "card",
    //         card: elements.getElement(CardElement),
    //     });

    //     if (error) {
    //         console.error(error);
    //         alert(error.message);
    //     } else {
    //         alert("Payment Successful!");
    //         console.log("Payment Method:", paymentMethod);
    //     }
    // };
    // const payNow = () => {
    //     let options = {
    //         key: "rzp_test_q1aD8S4CGOEb75",
    //         amount:
    //             reduxStateCart.reduce(
    //                 (total, current) => total + current.totalPrice,
    //                 0
    //             ) * 100,
    //         currency: "Dollars",
    //         name: "CraveEats",
    //         description: "Fast Delivery Service",
    //         image:
    //             "https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png",
    //         handler: (data) => {
    //             alert("Payment Successful");
    //             console.log(data);
    //         },
    //         prefill: {
    //             name: reduxStateUser.fullName,
    //             email: reduxStateUser.email,
    //         },
    //         theme: {
    //             color: "#e23744",
    //         },
    //     };

    //     let razorPay = new window.Razorpay(options);
    //     razorPay.open();
    // };


    const [restaurant, setRestaurant] = useState([]);

    const dispatch = useDispatch();
    console.log("cart", reduxStateCart);

    // useEffect(() => {
    //     reduxStateCart.map((food) => (
    //         console.log(food.restaurant);
    //     ));
    // });


    // dispatch(getSpecificRestaurant(reduxStateCart.food.restaurant)).then(() => {


    //     console.log("formated", data.payload);
    //     setRestaurant(data.payload);

    //     // });
    // }, []);


    return (

        // <Elements stripe={stripePromise}>
        <div className="my-3 flex flex-col gap-3 items-center">
            <h1 className="text-xl text-center md:text-2xl font-bold">Checkout</h1>
            <div className="w-full md:w-3/5 rounded-lg py-3 shadow-lg bg-white flex flex-col items-center">
                <h3 className="text-lg font-semibold">Summary</h3>
                <div className="flex w-full flex-col gap-2 items-center">
                    <h5 className="text-base tracking-wider">ORDER FROM</h5>
                    {/* {reduxStateCart?.map((food) => ( */}


                    <div className="flex w-full flex-col items-center text-gray-400">
                        <h4>Domino's Pizza</h4>
                        <small>GT Woorld Mall, Magadi Road, NCR Noida</small>
                    </div>

                    <div className="my-4 h-32 overflow-y-scroll px-4 flex flex-col gap-2 w-full md:w-3/5">
                        {reduxStateCart?.map((food) => (
                            <FoodItem key={food._id} {...food} />
                        ))}
                        {/* <FoodItem {...food} />
                            </div> */}
                    </div>
                    {/* ))} */}

                    <div className="flex flex-col gap-3 w-full md:w-3/5 items-center">
                        <h4 className="text-xl font-semibold">Choose Address</h4>
                        <AddressList address={address} />
                    </div>
                </div>
                <button className="flex items-center gap-2 justify-center my-4 md:my-8 w-full px-4 md:w-4/5 h-14 text-white font-medium text-lg bg-CraveEats-400 rounded-lg"
                    onClick={makePayment}>
                    Pay Securely <BsShieldLockFill />
                </button>
                {/* <div className="w-full md:w-4/5 px-4">
                        <CheckoutForm totalAmount={totalAmount} />
                    </div> */}
            </div>
        </div>
        // </Elements>
    );
}

export default CheckoutPage;