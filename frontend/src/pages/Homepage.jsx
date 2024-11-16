import SignUpButton from "../components/Buttons/SignUpButton";
import Navbar from "../components/Navbar/Navbar";

const mainColour = "#646cff";

export default function Home() {
  return (
    <div className="home-container">
      <Navbar variant="homepage" />
      <CTASection mainColour={mainColour} />
    </div>
  );
}

function CTASection() {
  return (
    <div className="cta-section">
      <h1>
        Welcome to <br />
        <span style={{ color: mainColour }}>FlowLeaflets</span>
      </h1>
      <p className="cta-paragraph">
        Detailed caselogs for patients you see, vital care for those in need,
        globally
      </p>
      <SignUpButton />
    </div>
  );
}
