import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  // const products = [
  //   {
  //     name: "Stlyish Coffee Planter",
  //     slug: "coffee-plant",
  //     price: 150,
  //     img: "https://ik.imagekit.io/kirtanchandak/Plant_Port_/coffee.webp?updatedAt=1687069364083",
  //   },
  //   {
  //     name: "Tree Trunk Blues",
  //     slug: "tree-trunk-planter",
  //     price: 220,
  //     img: "https://ik.imagekit.io/kirtanchandak/Plant_Port_/trunk.webp?updatedAt=1687069364173",
  //   },
  // ];

  const getAllProducts = async () => {
    try {
      const response = await axios.get("/api/users/getAllProducts");
      setProducts(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="flex">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
          {products.map((product) => (
            <div key={product.slug} className="bg-gray-300 rounded-xl pb-6">
              <Image
                src={product.image}
                width={300}
                height={300}
                alt="product image"
                className="flex justify-center items-center rounded-xl aspect-square"
              />
              <div className="pt-3 px-5">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p className="font-medium text-xl">£{product.price}</p>
                <p className="font-montserrat font-medium mb-3 text-sm">
                  From - {product.farmerName}
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
    </>
  );
}

export default Products;
