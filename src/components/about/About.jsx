import React from "react";
import Back from "../common/Back";
import Heading from "../common/Heading";
import img from "../images/services.jpg";
import "./about.css";

const About = () => {
  return (
    <>
      <section className="about">
        <Back name="About Us" title="About Us - Who We Are?" cover={img} />
        <div className="container flex mtop">
          <div className="left row">
            <Heading
              title="Discover Our Literary Journey"
              subtitle="Unleashing the Power of Words to Inspire, Entertain, and Illuminate"
            />

            <p>
            ransformative journeys that await within their pages. If you seek knowledge, adventure, or inspiration through books, you've discovered your digital haven.

📚 Embark on a Literary Odyssey: Immerse yourself in an extensive collection of literary treasures spanning genres, cultures, and eras. From timeless classics that have shaped civilizations to contemporary gems that reflect our ever-changing world, we've curated a diverse library catering to every reader's palate.
            </p>
            <p>
            Embark on this literary voyage as we celebrate the enchantment of storytelling, the influence of words, and the infinite imagination kindled by books. Journey with us, where pages evolve into gateways and every sentence leads to new vistas.
            </p>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default About;
