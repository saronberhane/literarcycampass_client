import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import { location } from "../../data/Data";
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Location = () => {
  const [genre, setGenre] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchGenre = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/genre`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setBook(response.data.data);
      // console.log(response.data.data.genre);
      setGenre(response.data.data.genre);
      // console.log(response.data.data.books);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchGenre();
  }, []);
  return (
    <>
      <section className="location padding">
        <div className="container">
          <Heading
            title="Genre Spotlight"
            subtitle="Delve into the Depths of Different Book Genres and Uncover Captivating Stories."
          />
          <ul className="ull">
            {genre.map((g) => (
              <li className="ft4">
                <Link className="links" to={`genre/${g._id}`}>
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Location;
