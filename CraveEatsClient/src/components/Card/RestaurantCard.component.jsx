import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";

function RestaurantCard(props) {


    return (

        <Link to={`/restaurant/${props._id}`} className="w-full md:w-1/2 lg:w-1/3">
            <div className="bg-white p-4 mb-4 w-full rounded-2xl transition duration-700 ease-in-out hover:shadow-lg ">
                <div className="w-full  lg:h-64 relative">
                    <div className=" w-full bottom-4 flex items-end justify-between">
                        <div className="flex flex-col gap-2 items-start absolute">
                            {props.isPro && (
                                <span className="bg-CraveEats-400 text-white px-2 py-1 rounded text-sm">
                                    Pro extra 10% off
                                </span>
                            )}
                            {props.isOff && (
                                <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                                    {props.discount ? `$${props.discount} OFF` : "Discount Available"}
                                </span>
                            )}
                        </div>
                        <img
                            src={props.image?.images?.length > 0 ? props.image.images[0].Location : "/Pizza.avif"}
                            alt="food"
                            className="w-full h-full rounded-2xl"
                        />
                    </div>
                    <div className="my-2 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xl font-medium">{props.name}</h4>
                            <span className="bg-green-800 text-white text-sm p-1 rounded flex items-center">
                                {props.restaurantReviewValue} <AiTwotoneStar />
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-gray-500">
                            <p>{props.cuisine.join(", ")}</p>
                            <p>$ {props.averageCost} for one</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default RestaurantCard;