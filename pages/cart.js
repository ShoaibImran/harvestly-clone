import React from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Layout from "@/components/Layout";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/store/slices/cart.slice";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log();

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    // Calculate total price based on cart items
    cart.cart.cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();

  const { data: session } = useSession();
  return (
    <div>
      {cart.cart.cartItems.length === 0 ? (
        <>
          <div className="flex justify-center items-center flex-col md:m-24 md:pt-0 pt-28 font-montserrat">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png"
              width={300}
              height={300}
              className="mr-7"
            />
            <h1 className=" text-2xl font-medium mt-10">Your bag is empty</h1>
            <p className="text-gray-500 pt-2">
              Looks like you haven't made your choice yet..
            </p>
            <Link href="/" className="mt-4 bg-green-500 p-2 rounded-lg">
              Back To Homepage
            </Link>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div class="container mx-auto px-4 py-8 pt-20 font-montserrat">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-3/4 lg:pl-24">
                {cart.cart.cartItems?.map((item) => (
                  <div key={item.id} className="p-5 ">
                    <div className="flex items-center gap-5 flex-col md:flex-row">
                      <div className="">
                        <Image
                          alt="product-img"
                          src={item.image}
                          width={300}
                          height={300}
                          className="md:w-[200px]"
                        />
                      </div>
                      <div className="mr-36">
                        <h1 className="text-xl">{item.name}</h1>
                        <h1 className="text-xl font-semibold">₹{item.price}</h1>
                        <div className="flex items-center gap-2 pt-3">
                          <button
                            className="bg-green-300 px-2"
                            onClick={() =>
                              dispatch(incrementQuantity({ _id: item._id }))
                            }
                          >
                            +
                          </button>
                          <button
                            className="bg-red-300 px-2"
                            onClick={() =>
                              dispatch(decrementQuantity({ _id: item._id }))
                            }
                          >
                            -
                          </button>
                        </div>
                        <p className="pt-2">Quantity: {item.quantity}</p>
                        <button
                          className="p-1 mt-2 text-gray-500"
                          onClick={() =>
                            dispatch(removeFromCart({ _id: item._id }))
                          }
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div class="md:w-3/4 md:pl-8">
                <div class="ml-6 w-60 pt-4">
                  <div class="px-2 py-3 sm:pb-4.5 lg:py-5 border-2 border-gray-800">
                    <h1>Total Amount: {totalPrice} </h1>
                  </div>
                  <div className="mt-3">
                    {session?.user ? (
                      <Link
                        class="bg-green-500  font-semibold px-4 py-1 rounded "
                        href="/shipping"
                      >
                        Check Out
                      </Link>
                    ) : (
                      <Link
                        class="bg-green-500  font-semibold px-4 py-1 rounded "
                        href="/login"
                      >
                        Check Out
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
