import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialIcons from "./components/SocialIcons";

export default function App() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none"
      >
        <source src="/img/127983 (Original).mp4" type="video/mp4" />
      </video>

      {/* Dark overlay over video */}
      <div className="fixed inset-0 bg-primary-dark/50 -z-5"></div>

      {/* Content */}
      <div className="relative text-white h-screen overflow-hidden">
        <Navbar />
        <Hero />
      </div>

      {/* Social Icons */}
      <SocialIcons />
    </div>
  );
}
