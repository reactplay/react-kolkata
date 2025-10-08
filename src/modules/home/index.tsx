import AboutSection from "./(sections)/about";
import BlogSection from "./(sections)/blogs";
import EventsSection from "./(sections)/event";
import HeroSection from "./(sections)/hero";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <BlogSection />
    </>
  );
};

export default LandingPage;
