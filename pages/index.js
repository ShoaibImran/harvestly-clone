import Navbar from "@/components/Navbar";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineStorefront } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import { GiFarmTractor } from "react-icons/gi";
import family from "../assets/family-2.webp";
import { FiCheckCircle } from "react-icons/fi";
import { GiFruitBowl } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import cattle from "../assets/cattle-1.jpg";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

export default function Home() {
  const farmers = [
    {
      id: 1,
      title: "Sales Platform",
      desc: "We offer farmers a direct avenue to showcase and sell their diverse produce, fostering direct connections with consumers without intermediaries. This empowers farmers to set prices, control inventory, and personalize their sales strategies",
      img: <MdOutlineStorefront size={100} />,
    },
    {
      id: 2,
      title: "Market Reach",
      desc: "By joining our platform, farmers gain access to a broader customer base, enhancing visibility for their unique offerings. This extended reach opens up new opportunities for sales and growth, expanding their market presence significantly.",
      img: <MdVisibility size={100} />,
    },
    {
      id: 3,
      title: "FARM-TO-TABLE Solutions",
      desc: "Provide farmers with tools for streamlined crop planning, harvest tracking, and resource allocation. Implement inventory tracking, optimize delivery routes, and ensure product traceability for efficient supply chain management.",
      img: <GiFarmTractor size={100} />,
    },
  ];

  const farmerBenifits = [
    {
      id: 1,
      title: "Highest quality support",
      img: <FiCheckCircle color="#5BBC1C" />,
    },
    {
      id: 2,
      title: "Easy-to-use platform",
      img: <FiCheckCircle color="#5BBC1C" />,
    },
    {
      id: 3,
      title: "All-in-one solution",
      img: <FiCheckCircle color="#5BBC1C" />,
    },
    {
      id: 4,
      title: "Convenient delivery",
      img: <FiCheckCircle color="#5BBC1C" />,
    },
  ];

  const customerBenifits = [
    {
      id: 1,
      title: "Access to Fresh, Local Produce:",
      desc: "Get fresh farm products delivered at your doorstep!",
      img: <GiFruitBowl size={100} color="#5BBC1C" />,
    },
    {
      id: 2,
      title: "Community Building and Support",
      desc: "Support the farmer community and create a sense of satisfaction!",
      img: <SiHomeassistantcommunitystore size={100} color="#5BBC1C" />,
    },
    {
      id: 3,
      title: "Community Building and Support",
      desc: "Support the farmer community and create a sense of satisfaction!",
      img: <SiHomeassistantcommunitystore size={100} color="#5BBC1C" />,
    },
  ];
  return (
    <>
      <div className="">
        <div className="background">
          <Navbar />
          <div className="md:px-28 px-4 md:mt-24 mt-4">
            <h1 className="font-bebas md:text-8xl text-7xl font-extrabold text-white">
              A DIRECT FARM TO <br /> CONSUMER APP, DELIVERED
            </h1>
            <p className="font-bebas mt-6 font-bold md:text-4xl text-white text-3xl">
              HARVESTLY: SEAMLESSLY DELIVERING FRESH FARM PRODUCE DIRECTLY TO
              YOUR TABLE
            </p>
            <button className="mt-6 py-3 px-4 bg-primary rounded-full text-white font-medium">
              <span className="flex">
                <span className="text-xl font-semibold ">Get Started</span>
                <span className="ml-2">
                  <FaArrowRightLong size={29} />
                </span>
              </span>
            </button>
          </div>
        </div>

        <div className="lg:px-28 md:px-6 px-4 mt-24">
          <h1 className="text-center text-6xl font-bold">
            WHAT WE DO FOR
            <span className="bg-primary py-1 px-2 ml-2 ">FARMERS</span>
          </h1>
          <div className="flex justify-center items-center">
            <div className="mt-16">
              <div className="flex justify-center items-center">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                  {farmers.map((farmer) => (
                    <div key={farmer.id} className="">
                      <div className="flex justify-center items-center">
                        <span>{farmer.img}</span>
                      </div>
                      <div className="text-center mt-5">
                        <h1 className="text-4xl font-bold text-primary">
                          {farmer.title}
                        </h1>
                        <p className="font-montserrat text-base font-medium mt-1 px-10 text-gray-700 leading-7">
                          {farmer.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex md:px-52 px-4 md:pt-36 pt-16 transition-opacity duration-300">
          <div className="md:w-1/2">
            <Image
              src={family}
              width={500}
              height={500}
              className="rounded-xl"
            />
          </div>
          <div className="md:w-1/2 md:mt-2 mt-6">
            <button className="text-2xl py-2 px-4 rounded-full bg-green-100 font-bold text-green-600">
              American Owned
            </button>
            <h1 className="font-bold text-6xl mt-6">Supporting Family Farms</h1>
            <p className="font-montserrat font-medium text-xl md:mt-6 mt-4">
              By registering your farm or ranch on Harvestly, you are delivering
              the freshest products directly to your customers. You will have
              the freedom to manage all of your products and prices.
            </p>
            <div className="grid md:grid-cols-2 grid-cols-1 mt-4">
              {farmerBenifits.map((farmer) => (
                <div key={farmer.id} className="flex mt-3 text-xl">
                  <span className="mt-1">{farmer.img}</span>
                  <p className="font-medium ml-2">{farmer.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 mt-28 py-14">
          <div className="pt-12 flex flex-col justify-center items-center px-4 text-center">
            <button className="text-2xl py-2 px-4 rounded-full bg-green-100 font-bold text-green-600">
              Build a Heathier Future
            </button>
            <h1 className="text-6xl font-bold mt-6">
              Give Your Family a Better Option
            </h1>
            <p className="font-montserrat mt-6 md:px-96 text-lg font-medium">
              Experience the unparalleled delight of farm-fresh goodness
              delivered straight to your doorstep. Enjoy the convenience of a
              direct-from-farm experience, embracing the flavors of the harvest
              season in every bite, right in the comfort of your home.
            </p>
            <div className="flex">
              <div className="grid md:grid-cols-3 grid-cols-1">
                {customerBenifits.map((customer) => (
                  <div className="mt-12" key={customer.id}>
                    <span className="flex justify-center items-center">
                      {customer.img}
                    </span>
                    <h1 className="text-4xl font-bold mt-2">
                      {customer.title}
                    </h1>
                    <p className="mt-1 md:px-24 font-montserrat text-xl font-medium">
                      {customer.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex md:px-52 px-4 md:pt-36 pt-16 transition-opacity duration-300 gap-8">
          <div className="md:w-1/2 md:mt-2 mt-6">
            <button className="text-2xl py-2 px-4 rounded-full bg-green-100 font-bold text-green-600">
              Changing the Game
            </button>
            <h1 className="font-bold text-6xl mt-6">
              We aim to revolutionize the industry by selling direct
            </h1>
            <p className="font-montserrat font-medium text-xl md:mt-6 mt-4">
              With mega corporations buying up farm land across the nation and
              driving profit margins to record lows, we have an opportunity to
              disrupt an industry determined to see you fail. This is our best
              chance to ensure the future of our nation is brighter and
              healthier.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src={cattle}
              width={600}
              height={600}
              className="rounded-xl mt-24"
            />
          </div>
        </div>
        <div className="mt-24 md:px-52 px-4">
          <h1 className="text-6xl font-bold">Browse Products</h1>
          <div className="mt-8">
            <Products />
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
