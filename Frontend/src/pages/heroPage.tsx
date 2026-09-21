import heroImage from "../assets/heros.png";
import "../styles/hero.css";
const heroPage = () => {
  return (
    <div
      className="hero-container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <img
        style={{ width: "70vW", height: "88vh", marginTop: "65px" }}
        src={heroImage}
        alt=" not found"
      />
    </div>
  );
};

export default heroPage;
