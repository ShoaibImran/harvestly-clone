import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cart.slice";
import { useSession } from "next-auth/react";

function product() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [image, setImage] = useState("");
  const [productStock, setProductStock] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [quantity, setQunatity] = useState(1);

  const { status, data: session } = useSession();

  const getProductDetails = async (productId, userId) => {
    try {
      const reponse = await axios.get(
        `/api/products/getProduct?userId=${userId}&productId=${productId}`
      );
      setProduct(reponse.data);
      setProductName(reponse.data.name);
      setProductDescription(reponse.data.description);
      setProductPrice(reponse.data.price);
      setImage(reponse.data.image);
      setProductStock(reponse.data.stock);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (router.isReady && session?.user?.sub) {
      const userId = session.user.sub;
      const productId = router.query.id;
      getProductDetails(productId, userId);
    }
  }, [router.isReady, session?.user?.sub]);

  useEffect(() => {
    if (product) {
      setShowNotification(false);
    }
  }, [product]);

  const addToBag = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Hide notification after 3 seconds
  };

  const onAddToBag = async () => {
    dispatch(addToCart(product));
    addToBag();
  };

  if (!product) {
    return <p>Product not found</p>;
  }
  return (
    <>
      <Navbar />
      <div className="mt-24 md:mt-32 md:container flex flex-col md:flex-row justify-center items-center gap-6 font-montserrat">
        <div className="">
          <Image src={image} width={300} height={300} alt="product image" />
        </div>
        <div className="flex flex-col pr-[70px]">
          <h1 className="text-2xl font-medium">{productName}</h1>
          <p className="text-base pt-1 text-gray-500">Per peice</p>
          <p className="pt-2 text-2xl font-medium">${productPrice}</p>
          <div className="flex gap-5 pt-4">
            <button
              className="px-3 py-2 border-[3px] border-green-500"
              onClick={onAddToBag}
            >
              Add to bag
            </button>
            {showNotification && (
              <div className="fixed bottom-0 left-0 w-full bg-green-500 text-white text-center py-2">
                Product added to bag!
              </div>
            )}
            <button className="px-3 py-2 bg-green-500">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default product;
