import { useRouter } from "next/router";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FaStar } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { BiSolidDoorOpen } from "react-icons/bi";

function SideBar() {
  const router = useRouter();

  const isActive = (pathname) => {
    return router.pathname === pathname
      ? "bg-primary"
      : "bg-white hover:bg-[#e5f9d9]";
  };

  const handleLogOut = async () => {
    await signOut();
    localStorage.clear();
  };
  return (
    <>
      <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60">
        <div className="flex flex-col justify-between h-full">
          <div className="flex-grow">
            <div className="px-4 py-6 text-center border-b">
              <h1 className="text-xl font-bold leading-none">
                <span className="">Farmer Dashboard</span>
              </h1>
            </div>
            <div className="p-4">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/farmer/profile"
                    className={`flex items-center rounded-xl font-bold text-sm text-gray-900 py-3 px-4 ${isActive(
                      "/farmer/profile"
                    )}`}
                  >
                    <CgProfile size={25} />
                    <span className="ml-3">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/farmer/products"
                    className={`flex items-center rounded-xl font-bold text-sm text-gray-900 py-3 px-4 ${isActive(
                      "/farmer/products"
                    )}`}
                  >
                    <GiCardboardBoxClosed size={25} />
                    <span className="ml-3">Products</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/farmer/ratings"
                    className={`flex items-center rounded-xl font-bold text-sm text-gray-900 py-3 px-4 ${isActive(
                      "/farmer/ratings"
                    )}`}
                  >
                    <FaStar size={25} />
                    <span className="ml-3">Ratings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-4">
            <button
              onClick={() => signOut()}
              className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition"
            >
              <BiSolidDoorOpen size={15} />
            </button>
            <button onClick={handleLogOut} className="font-bold text-lg ml-2">
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
