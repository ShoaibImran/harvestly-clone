"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import { IoStarSharp } from "react-icons/io5";
import { useRouter } from "next/router";

function farmpage() {
  const router = useRouter();
  const [farmName, setFarmName] = useState("");
  const [aboutFarm, setAboutFarm] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [image, setImage] = useState("");
  const [products, seProducts] = useState([]);

  const { status, data: session } = useSession();
  const userId = session?.user?.sub;

  const getUserDetails = async (userId) => {
    try {
      //   const userId = localStorage.getItem("_id");
      const response = await axios.get("/api/users/getUserDetails", {
        params: {
          userId: userId,
        },
      });
      setFarmName(response.data?.user?.farmName);
      setAboutFarm(response.data?.user?.aboutFarm);
      setContactDetails(response.data?.user?.contactDetails);
      setImage(response.data?.user?.profilePicture);
      seProducts(response.data?.user?.products);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (session?.user?.sub) {
  //     const userId = session.user.sub;
  //     getUserDetails(userId);
  //   }
  // }, [session?.user?.sub]);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userRatings, setUserRatings] = useState([]);
  console.log(comment);
  const postReview = async () => {
    if (session) {
      try {
        const response = await axios.post("/api/users/postRating", {
          targetUserId: router?.query?.id,
          userId: userId,
          rating: rating,
          comment: comment,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      router.push("/login");
    }
  };

  const getRatings = async (userId) => {
    try {
      const response = await axios.get(
        `/api/users/getRatings?userId=${userId}`
      );
      setUserRatings(response.data.reviews);
      console.log(response.data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const userId = router.query.id;
      getRatings(userId);
      getUserDetails(userId);
    }
  }, [router.isReady]);

  return (
    <>
      <Navbar />
      <div className="font-montserrat px-40">
        <div className="flex flex-col items-center">
          <div className="">
            <Image
              src={image}
              width={300}
              height={300}
              className="aspect-square rounded-full"
              alt="image"
            />
          </div>
          <h1 className="text-4xl font-extrabold mt-8">{farmName}</h1>
          <p className="mt-8 font-medium text-lg text-center">{aboutFarm}</p>
          <div>
            <h1 className="font-bold text-4xl mt-8 text-center">Products</h1>
            <div className="flex mt-8">
              <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
                {products.map((product) => (
                  <div
                    key={product.slug}
                    className="bg-gray-300 rounded-xl pb-6"
                  >
                    <Image
                      src={product.image}
                      width={300}
                      height={300}
                      alt="product image"
                      className="flex justify-center items-center rounded-xl aspect-square"
                    />
                    <div className="pt-3 px-5">
                      <h1 className="text-2xl font-bold">{product.name}</h1>
                      <p className="font-medium text-xl">₹{product.price}</p>
                      <p className="font-montserrat font-medium mb-3 text-sm">
                        From - {farmName}
                      </p>
                      <Link
                        href={`/product/${product._id}`}
                        className="w-[205px] p-1 border-[1px] border-black"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h1 className="font-bold text-4xl mt-8 text-center">Reviews</h1>
            <div>
              <div className="mt-8">
                <p className="text-lg font-medium">Write a review 📃</p>
                <textarea
                  className="border-2 border-black mt-2"
                  id=""
                  cols="50"
                  rows="6"
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-2">
                <StarRatings
                  rating={rating}
                  numberOfStars={5}
                  name="rating"
                  changeRating={(e) => setRating(e)}
                  starRatedColor="#ffb829"
                  starHoverColor="#ffb829"
                />
              </div>
              <button
                className="p-3 bg-primary mt-2 rounded-lg"
                onClick={postReview}
              >
                Post Review
              </button>
            </div>
          </div>
          <div className="mt-16 pb-16 flex">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              {userRatings.map((rating) => (
                <div
                  key={rating.createdAt}
                  className="bg-gray-100 px-6 py-3 rounded-lg"
                >
                  <div className="flex gap-2">
                    <Image
                      src={rating.reviewer.profilePicture}
                      width={50}
                      height={50}
                      className="rounded-full aspect-square"
                      alt="profile-img"
                    />
                    <div className="">
                      <p className="font-bold text-lg">
                        {rating.reviewer.name}
                      </p>
                      <div className="flex gap-1">
                        {[...Array(rating.rating)].map((_, index) => {
                          return (
                            <label key={index}>
                              <IoStarSharp
                                className="star"
                                size={20}
                                color="ffb829"
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-gray-500 font-medium text-base">
                    {rating.comment}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default farmpage;
