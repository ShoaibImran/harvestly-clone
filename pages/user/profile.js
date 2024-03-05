"use client";
import SideBar from "@/components/SideBar";
import UserSideBar from "@/components/UserSideBar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

function profile() {
  const { status, data: session } = useSession();

  const email = session?.user?.email;
  const userId = session?.user?._id;

  const [farmName, setFarmName] = useState("");
  const [aboutFarm, setAboutFarm] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [image, setImage] = useState("");

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("_id");
      const response = await axios.post("/api/users/postProfile", {
        userId,
        farmName,
        aboutFarm,
        contactDetails,
      });
      console.log(response);
    } catch (err) {
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
      console.log(response);
      setFarmName(response.data?.user?.farmName);
      setAboutFarm(response.data?.user?.aboutFarm);
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
        <UserSideBar />
        <main className="ml-60 max-h-screen overflow-auto p-12">
          <h1 className="text-3xl font-bold ">Profile</h1>
          <p className="mb-8 text-xl">
            Your email: <span className="font-semibold">{email}</span>
          </p>
          <form action="#" class="space-y-8">
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
                class="text-2xl block mb-2 font-medium text-gray-900"
              >
                Name
              </label>
              <input
                value={farmName}
                type="text"
                id="subject"
                class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                placeholder="for eg. Harvestly Farms"
                required
                onChange={(e) => setFarmName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                class="text-2xl block mb-2 font-medium text-gray-900"
              >
                Contact Info
              </label>
              <input
                value={contactDetails}
                type="text"
                id="subject"
                class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                placeholder="Contact"
                required
                onChange={(e) => setContactDetails(e.target.value)}
              />
            </div>
            <button
              type="submit"
              class="py-3 px-5 text-2xl font-medium text-center rounded-lg bg-primary sm:w-fit focus:ring-4 focus:outline-none"
              onClick={handleProfileSubmit}
            >
              Submit
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default profile;
