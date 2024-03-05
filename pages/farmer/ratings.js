import SideBar from "@/components/SideBar";

function ratings() {
  return (
    <div className="relative overflow-hidden max-h-screen font-montserrat">
      <SideBar />
      <main className="ml-60 max-h-screen overflow-auto">
        <h1>Ratings</h1>
      </main>
    </div>
  );
}

export default ratings;
