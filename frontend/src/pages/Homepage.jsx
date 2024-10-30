import React from "react";
import Navbar from "../components/Navbar/Navbar";
import CTASection from "../components/Homepage/CTASection";

const mainColour = "#646cff";

export default function Home() {
  return (
    <div className="home-container">
      <Navbar variant="homepage" />
      <CTASection mainColour={mainColour} />
    </div>
  );
}
