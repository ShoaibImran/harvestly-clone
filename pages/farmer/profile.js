"use client";
import SideBar from "@/components/SideBar";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function profile() {
  const error = () => toast.error("Profile pic or some field is missing!");
  const profileUpdated = () => toast.success("Profile updated successfully!");
  const { status, data: session } = useSession();

  const email = session?.user?.email;
  const userId = session?.user?.sub;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [farmName, setFarmName] = useState("");
  const [aboutFarm, setAboutFarm] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [image, setImage] = useState("");

  const onSubmit = async (data) => {
    try {
      const userId = localStorage.getItem("_id");
      const result = await axios.post("/api/users/postProfile", {
        userId: userId,
        farmName: data.farmName,
        aboutFarm: data.aboutFarm,
        contactDetails: data.contactDetails,
        profilePicture: profilePicture,
      });
      if (result.status >= 200 && result.status < 300) {
        // Request was successful
        profileUpdated();
        console.log("Profile updated successfully");
      }
    } catch (err) {
      error();
      console.log(err);
    }
  };

  const getUserDetails = async () => {
    try {
      const userId = localStorage.getItem("_id");
      const response = await axios.get("/api/users/getUserDetails", {
        params: {
          userId: userId,
        },
      });
      setFarmName(response.data?.user?.farmName);
      setAboutFarm(response.data?.user?.aboutFarm);
      setContactDetails(response.data?.user?.contactDetails);
      setImage(response.data?.user?.profilePicture);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const convertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setProfilePicture(reader.result);
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  return (
    <>
      <div className="relative overflow-hidden max-h-screen font-montserrat">
        <SideBar />
        <main className="ml-60 max-h-screen overflow-auto p-12">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-bold ">Profile</h1>{" "}
              <p className="mb-8 text-xl">
                Your email: <span className="font-semibold">{email}</span>
              </p>
            </div>
            <Link
              href={`/farmProfile/${userId}`}
              className=" bg-primary rounded-lg p-2 font-medium h-10"
            >
              View my Profile Page
            </Link>
          </div>

          <form
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
            noValidate
          >
            <div>
              <label
                htmlFor="subject"
                className="text-2xl block mb-2 font-medium text-gray-900"
              >
                Profile Picture
              </label>
              <input type="file" accept="image/*" onChange={convertToBase64} />
              <Image
                alt="profile picture"
                src={profilePicture || image}
                width={200}
                height={200}
                className="rounded-full aspect-square mt-4 object-contain"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="text-2xl block mb-2 font-medium text-gray-900"
              >
                Farm Name
              </label>
              <input
                defaultValue={farmName}
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                placeholder="for eg. Harvestly Farms"
                required
                {...register("farmName", { required: "Farm Name is required" })}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-2xl font-medium text-gray-900"
              >
                About Your Farm
              </label>
              <textarea
                defaultValue={aboutFarm}
                id="message"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 "
                placeholder="Tell users more about your farm"
                {...register("aboutFarm", {
                  required: "Information about farm is required",
                })}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="text-2xl block mb-2 font-medium text-gray-900"
              >
                Contact Info
              </label>
              <input
                defaultValue={contactDetails}
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                placeholder="Contact"
                required
                {...register("contactDetails", {
                  required: "Contact details are required",
                })}
              />
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-2xl font-medium text-center rounded-lg bg-primary sm:w-fit focus:ring-4 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </main>
        <ToastContainer />
      </div>
    </>
  );
}

export default profile;
