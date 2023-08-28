import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Genre = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [genreBooks, setGenreBooks] = useState([]);

  // const navigate = useNavigate();

  const fetchGenreBook = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`/book/filterbygenre/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setGenreBooks(response.data.data.books);
      // console.log(response.data.data.books);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGenreBook();
  }, []);

  return (
    <>
      <div className="container mbot">
        <div className="content grid4 mtop">
          {genreBooks.map((book, index) => {
            const {
              cover_url,
              author,
              genre,
              title,
              no_of_page,
              language,
              _id,
            } = book;
            return (
              <Link className="box shadow" key={index} to={`/book/${_id}`}>
                <div className="img">
                  <img src={cover_url} alt={title} />
                </div>
                <div className="text text2">
                  <div className="category flex">
                    {author.map((aut) => {
                      // console.log(aut.full_name);
                      return <p>{aut.full_name}</p>;
                    })}
                  </div>
                  <h4>{title}</h4>
                  <p>lang: {language}</p>
                </div>
                <div className="button flex text2">
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
      </div>
    </>
  );
};

export default Genre;
