import React, { useState } from "react";
import Heading from "../../common/Heading";
import "./hero.css";

const Hero = () => {
  const [dropdown1Value, setDropdown1Value] = useState("");

  return (
    <>
      <section className="hero">
        <div className="container">
          <Heading
            title="Search Your Favorite Book "
            subtitle="Become a memeber of literacy campass readers community."
          />

          <form className="flex">
            <div className="box">
              <span>Genre</span>

              <div className="dropdown-container">
                <select
                  className="dropdown"
                  value={dropdown1Value}
                  onChange={(e) => setDropdown1Value(e.target.value)}
                >
                  <option className="dropdownvalues">Select Genre</option>
                  <option className="dropdownvalues" value="option1">
                    Option 1
                  </option>
                  <option className="dropdownvalues" value="option2">
                    Option 2
                  </option>
                </select>
              </div>
            </div>
            <div className="box">
              <span>Author </span>
              <div className="dropdown-container">
                <select
                  className="dropdown"
                  value={dropdown1Value}
                  onChange={(e) => setDropdown1Value(e.target.value)}
                >
                  <option className="dropdownvalues">Choose Author</option>
                  <option className="dropdownvalues" value="option1">
                    Option 1
                  </option>
                  <option className="dropdownvalues" value="option2">
                    Option 2
                  </option>
                </select>
              </div>
            </div>
            <div className="box">
              <span>Book Name</span>
              <input type="text" placeholder="Enter Book Title" />
            </div>

            <button className="btn1">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Hero;
