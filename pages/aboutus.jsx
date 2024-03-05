import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

function aboutus() {
  return (
    <>
      <div className="background-about">
        <Navbar />
        <div className="text-center mt-36">
          <h1 className="text-8xl text-white font-extrabold">
            WHO ARE
            <span className="bg-primary py-1 px-2 ml-2 leading-8">WE</span>
          </h1>
        </div>
      </div>
      <div className="mt-16 md:px-52 px-4">
        <h1 className="text-primary font-bold text-6xl text-center">
          OUR MISSION
        </h1>
        <h1 className="mt-6 font-bold text-4xl text-center">
          WELCOME TO HARVESTLY: CONNECTING FARMS TO YOUR TABLE
        </h1>
        <p className="font-montserrat font-medium mt-6 text-xl text-center leading-8">
          At Harvestly, we transcend traditional digital marketing roles,
          championing the cause of local farmers. Our mission is clear: empower
          farmers while connecting them with their local communities,
          eliminating intermediaries that impede their success.
        </p>
        <div className="mt-6">
          <h1 className="font-bold text-4xl">Our Commitment:</h1>
          <div className="ml-6 mt-6">
            <ul className="list-disc font-montserrat font-medium text-xl">
              <li>
                Crafting Brand Identity and Connections: We expertly mold brand
                identities that resonate with your farm's essence, forging
                strong audience connections.
              </li>
              <li>
                Enhancing Online Presence: We skillfully elevate online
                visibility through captivating web design and adept social media
                management.
              </li>
              <li>
                Creating Compelling Narratives: Our skilled creators weave
                narratives that build emotional ties and lasting memories with
                your audience.
              </li>
              <li>
                Tailored Engagement Campaigns: We customize campaigns to engage
                your audience, fostering unwavering customer loyalty.
              </li>
              <li>
                Data-Driven Growth Strategies: We specialize in uncovering
                valuable insights within data to refine strategies, ensuring
                your farm's enduring success.
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <h1 className="font-bold text-4xl">Our Expertise:</h1>
          <p className="mt-6 font-montserrat font-medium text-xl">
            Our proficiency in website creation and online presence
            amplification amplifies your impact. We specialize in crafting
            captivating websites that convey your farm's unique story and
            values. Our comprehensive social media and content creation services
            authentically represent your farm, connecting you with consumers
            seeking the local, authentic experience you offer.
          </p>
        </div>
        <div className="mt-6">
          <h1 className="font-bold text-4xl">Our Vision:</h1>
          <p className="mt-6 font-montserrat font-medium text-xl">
            We act as the bridge between diligent farmers and their customers,
            spotlighting the unique narratives behind each farm, their
            dedication, and the quality of local produce. Our vision is to
            nurture thriving communities centered around local farms and
            farmers' markets, promoting sustainability, shared values, and
            revitalizing local economies.
          </p>
        </div>
        <div className="mt-6">
          <h1 className="font-bold text-4xl">Our Ultimate Goal:</h1>
          <p className="mt-6 font-montserrat font-medium text-xl">
            Our mission is underpinned by a profound desire to improve public
            health by connecting people to healthy, locally sourced farm
            produce, contributing to a healthier, happier community. Contact Us
            to embark on this journey towards a thriving, interconnected local
            agriculture ecosystem.
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default aboutus;
