import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import img from "../images/services.jpg";
import Back from "../common/Back";
import { Link } from "react-router-dom";

const Author = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({ type: "", message: "" });

  const [author, setAuthor] = useState({
    picture_url: "",
    full_name: "",
    followers: [],
    birth_date: "",
    website:"",
    amazon_url: "",
    about: "",
    _id:""
  });

  const [authoredBooks, setAuthoredBooks] = useState([]);

  const fetchAuthor = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/author/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setBook(response.data.data);
      // console.log(response.data.data.author);
      setAuthor(response.data.data.author);
      // console.log(response.data.data.books);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const followAuthor = async () => {
    setIsLoading(true);

    try {
      const response = await axios.patch(
        `/user/followauthor`,
        { id: author._id }
      );
      /*error*/
      /*error*/
      /*error*/
      /*error*/
      /*error*/

      setAuthor(response.data.data.author);
      alert("You are now following the author!");

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      error?.response && alert(error?.response?.data?.message);
    }
  };

  const fetchAuthoredBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/book/byauthorid/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setBook(response.data.data);
      // console.log(response.data.data.author);
      setAuthoredBooks(response.data.data.books);
      // console.log(response.data.data.books);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, []);

  useEffect(() => {
    fetchAuthoredBooks();
  }, []);

  return (
    <section className="services mb">
      <Back name="Book" title="Author" cover={img} />
      <div className="featured container">
        <div className="author-detail">
          <div className="aa">
            <img
              className="Author"
              src={author.picture_url}
              alt={author.full_name}
            />
          </div>
          <div>
            <h2>{author.full_name}</h2>
            <p>birthdate : {author.birth_date.slice(0, 10)}</p>
            <p>
              website :{" "}{author.website}
            </p>
            <p>
              Amazon link:{" "}{author.amazon_url}
            </p>
            {/* <p>amazon link : {author.amazon_url}</p> */}
            {/* <p>followers : {author.followers.length}</p> */}
            <div className="grid2">
              <p className="pud">Followers : {author.followers.length}</p>
              <button
                className="btn33"
                disabled={isLoading}
                onClick={followAuthor}
              >
                Follow
              </button>
            </div>
            <p className="pud">{author.about}</p>

            <div>
              <div className="content grid3 mtop">
                {authoredBooks.map((book, index) => {
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
                    <Link
                      className="box shadow"
                      key={index}
                      to={`/book/${_id}`}
                    >
                      <div className="img">
                        <img src={cover_url} alt={title} />
                      </div>
                      <div className="text">
                        <div className="category flex">
                          {author.map((aut) => {
                            console.log(aut.full_name);
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Author;
