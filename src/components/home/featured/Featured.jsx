import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import "./Featured.css";
import FeaturedCard from "./FeaturedCard";
import axios from "axios";
import "../hero/hero.css";


const Featured = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resentBooks, setResentBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [bookName, setBookName] = useState("")
  const [genres, setGenres] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  // const [data, setData] = useState({name:"", value:""})

  const authorChangeHandler = (e) => {
    // console.log(e.target.value);
    setSelectedAuthor(e.target.value);
  };

  const genreChangeHandler = (e) => {
    console.log(e.target.value);
    setSelectedGenre(e.target.value);
  };

  const fetchResentBook = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("/book/new", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResentBooks(response.data.data.books);
      setAllBooks(response.data.data.books)
      console.log(response.data.data.books);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  
    const fetchAuthors = async () => {
      setIsLoading(true);
  
      try {
        const response = await axios.get("/author");
        setAuthors(response.data.data.author);
        console.log(response.data.data.author);
  
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
  
    const fetchGenres = async () => {
      setIsLoading(true);
  
      try {
        const response = await axios.get("/genre");
        setGenres(response.data.data.genre);
  
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    function changeAuthorNameToId(authorName){
      console.log(authors, authors)
      const author = authors.filter((author)=> author.full_name === authorName);
      console.log(author)
      const authorId = author[0].id;
      return authorId;
    }

    function changeGenreNameToId(genreName){
      const genre = genres.filter((genre)=> genre.title === genreName);
      console.log("hmm", genre)
      const genreId = genre[0].id;
      return genreId;
    }

    const filterBooks = async (e) => {
      e.preventDefault();

      setIsLoading(true);
      
      const data = {name: "", value:""}
      // console.log(selectedAuthor,);
       console.log(selectedAuthor, ":", selectedGenre, ":", bookName)
       console.log(data)
      if(selectedAuthor !== 'Authors' && (selectedGenre === '' || bookName === '')){
        console.log({value: (selectedAuthor), name:'author'}, changeAuthorNameToId(selectedAuthor))
        // setData({value: changeAuthorNameToId(selectedAuthor), name:'author'});
        data.value = changeAuthorNameToId(selectedAuthor);
        data.name = 'author';
      }
     
      if(selectedAuthor === '' && (selectedGenre !== 'Genres' || bookName === '')){
        // data.value = ;
        // console.log(changeGenreNameToId(selectedGenre))
        // data.name = 
        // setData({value: changeGenreNameToId(selectedGenre), name: 'genre'})
        data.value = changeGenreNameToId(selectedGenre);
        data.name = 'genre';
      }
     
      if(selectedAuthor === '' && (selectedGenre === '' || bookName !== '')){
        // data.value = ;
        // data.name = 'title'
        // setData({value: bookName, name:'title'})
        data.value = bookName;
        data.name = 'title'
      }

      try {
        console.log(data)
        console.log(`/book/search?${data.name}=${data.value}`)
        const response = await axios.get(`/book/search?${data.name}=${data.value}`);
        setSearchResults(response.data.data.books);
  
        setIsLoading(false);
      } catch (error) {
        alert(error.response.data.message)
        setIsLoading(false);
      }
    };

  useEffect(() => {
    fetchResentBook();
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, []);

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <>

<section className="hero">
        <div style={{paddingTop:"5%"}} className="container">
          <Heading 
            title="Search Your Favorite Book "
          />

          <form className="flex">
            <div className="box">
              <span>Author</span>

              <div className="options">
                 {authors.length >= 1 && (
                  <select
                    name="author"
                    id="author"
                    className="dropdown"
                    onChange={authorChangeHandler}
                  >
                    <option value="a">Authors</option>;
                    {authors.map((author) => {
                      return (
                        <option key={author.id} value={author.full_name}>
                          {author.full_name}
                        </option>
                      );
                    })}
                  </select>
                  )}
                </div>

            </div>
            <div className="box">
              <span>Genre </span>

                <div className="options">
                 {genres.length >= 1 && (
                  <select
                    name="genre"
                    id="genre"
                    className="dropdown"
                    onChange={genreChangeHandler}
                  >
                    {console.log(genres )}
                    <option value="a">Genres</option>;
                    {genres.map((genre) => {
                      return (
                        <option key={genre.id} value={genre.title}>
                          {genre.title}
                        </option>
                      );
                    })}
                  </select>
                  )}
                </div>
              
            </div>
            <div className="box">
              <span>Book Name</span>
              <input type="text" onChange={(e)=> setBookName(e.target.value)} placeholder="Enter Book Title" />
            </div>

            <button onClick={filterBooks} className="btn1">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </section>

      <section className="featured background">
       {searchResults.length !==0 ? <div className="container">
          <Heading
            title="Search Results"
          />
          <div className="content grid5 mtop">
            {searchResults.map((item) => (
              <FeaturedCard item={item} />
            ))}
          </div>
        </div>
        :  <>
          <Heading
          title="Recently Published Books"
          subtitle="Find recently published books."
        />
        <div className="content grid5 mtop">
          {resentBooks.map((item) => (
            <FeaturedCard item={item} />
          ))}
          </div>
          </>        
      }
      </section>
    </>
  );
};

export default Featured;
