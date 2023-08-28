import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";

const RecentCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resentBooks, setResentBooks] = useState([]);
  const [rate, setRate] = useState(0);

  // const navigate = useNavigate();

  const fetchResentBook = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("/book/mostrated", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResentBooks(response.data.data.book);
      // console.log(response.data.data.books);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResentBook();
  }, []);

  return (
    <>
      <div className="content grid4 mtop">
        {resentBooks.map((book, index) => {
          const { cover_url, author, genre, title, no_of_page, language, _id } =
            book;
          return (
            <Link className="box shadow" key={index} to={`/book/${_id}`}>
              <div className="img">
                <img src={cover_url} alt={title} />
              </div>

              <Container>
            {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                    <label>
                        <Radio
                            type="radio"
                            value={givenRating}
                            onClick={() => {
                                setRate(givenRating);
                                alert(
                                    `Are you sure you want to give
                                    ${givenRating} stars ?`
                                );
                            }}
                        />
                        <Rating>
                            <FaStar
                                color={
                                    givenRating < book.rate || givenRating === book.rate
                                        ? "rgb(255 201 40)"
                                        : "rgb(192,192,192)"
                                }
                            />
                        </Rating>
                    </label>
                );
            })}
        </Container>

              <div className="text">
                <div className="category flex">
                  {author.map((aut) => {
                    // console.log(aut.full_name);
                    return <p>{aut.full_name}</p>;
                  })}
                </div>
                <h4>{title}</h4>
                <p>lang: {language}</p>
              </div>
              <div className="button flex">
                <div>
                  <button className="btn2">{no_of_page}</button>{" "}
                  <label htmlFor="">pages</label>
                </div>
                {genre.map((gen) => {
                  return <p>{gen.title}</p>;
                })}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default RecentCard;
