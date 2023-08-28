import React, { useEffect, useState } from "react";
import img from "../images/services.jpg";
import Back from "../common/Back";
import "../home/featured/Featured.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Radio, Rating } from "./RatingStyles";
import { FaStar } from "react-icons/fa";
import { Divider, Avatar, Grid, Paper, IconButton, Button } from "@material-ui/core";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MoreHoriz } from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// import FeaturedCard from "../home/featured/FeaturedCard";

const Services = () => {
  const { id } = useParams();
  const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
  const ITEM_HEIGHT = 48;

  const options = ['Report'];

  const starsArray = [1, 2, 3, 4, 5];
  const [rate, setRate] = useState();
  const [review, setReview] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({
    about: "",
    author: [],
    cover_url: "",
    genre: [],
    language: "",
    no_of_page: "",
    title: "",
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [reviews, setReviews] = React.useState([]);
  const [rateiD, setRateId] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDialog = ()=>{
    setOpenDialog(false);
  }

  const [author, setAuthor] = useState({
    picture_url: "",
    full_name: "",
    followers: [],
    birth_date: "",
    amazon_url: "",
    about: "",
    _id: "",
  });

  const fetchBook = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`/book/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBook(response.data.data.book);
      setRate(response.data.data.book.rate)
      // console.log(response.data.data.book);

      // console.log(response.data.data.books);

      setIsLoading(false);
    } catch (error) {
      error?.response && alert(error?.response?.data?.message);
      setIsLoading(false);
    }
  };
  
  const fetchReviews = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`/book/reviews/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setReviews(response.data.data.books);

      setIsLoading(false);
    } catch (error) {
      console.log(error)
      error?.response && alert(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const reportReview = async (reported_user, book_id, review_id) => {
    setIsLoading(true);
    const data = {
      reported_user,
      book_id,
      review_id
    }
    try {
      const response = await axios.post(`/report`, data,{
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert(response.data.message);
      
      setIsLoading(false);
    } catch (error) {
      error?.response && alert(error?.response?.data?.message);
      setIsLoading(false);
    }
  };
  
  const submitRate = async (rate) => {
    setIsLoading(true);
    setRate(rate)
    try {
      const response = await axios.post(`/rate/${id}`, {
        rate
      },{
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.status === "SUCCESS") {
        setRateId(response?.data?.data?.newRate?._id)
        setOpenDialog(true)
        alert(response.data.message)
      }
      

      setIsLoading(false);
    } catch (error) {
      console.log(error)
      error?.response && alert(error?.response?.data?.message);
      setIsLoading(false);
    }
  };
  
  const submitReview = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const data = {
      rate_id: rateiD,
      book_id: id,
      review_message: review
    }

    try {
      const response = await axios.post(`/review`, data,{
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.status === "SUCCESS") {
        alert(response.data.message);
        setOpenDialog(false)
      }
      

      setIsLoading(false);
    } catch (error) {
      console.log(error)
      error?.response && alert(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const fetchAuthor = async () => {
    if (book.author.length !== 0) {
      setIsLoading(true);
      try {
        const response = await axios.get(`/author/${book.author[0]._id}`, {
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
        toast.error(error?.response?.data?.message);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);
  
  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    fetchAuthor();
  }, [book.author]);

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

  return (
    <>
      <section className="services mb">
        <Back name="Book" title="Detail" cover={img} />
        <div className="featured container">
          <div className="detail">
            <div className="aa">
              <img
                className="img_b"
                src={book.cover_url}
                alt={book.title}
              />
            </div>
            <div>
              <h3 className="aa f3">{book.title}</h3>
              {book.author.length !== 0 &&
                book.author.map((aut) => (
                  <Link className="links" to={`/author/${aut._id}`}>
                    {aut.full_name}
                  </Link>
                ))}

              <p>{book.about}</p>
              {book.no_of_page && (
                <>
                  <p className="pud">{book.no_of_page} ,Paperback</p>
                  <p className="pud">language : {book.language}</p>
                </>
              )}

              <div>
                <h2>Ratings</h2>
                <Container>
            {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                    <label>
                        <Radio
                            type="radio"
                            value={givenRating}
                            onClick={() => {
                                const result = window.confirm(
                                    `Are you sure you want to give
                                    ${givenRating} stars ?`
                                );
                                  if(result){
                                    submitRate(givenRating);
                                  }
                            }}
                        />
                        <Rating>
                            <FaStar fontSize={"30px"}
                                color={
                                    givenRating < rate || givenRating === rate
                                        ? "rgb(255 201 40)"
                                        : "rgb(192,192,192)"
                                }
                            />
                        </Rating>
                    </label>
                );
            })}
        </Container>
              </div>

              <div>
                <h2>About the author</h2>
                <div className="con">
                  <img
                    className="img_c"
                    src={author.picture_url}
                    alt={author.title}
                  />
                  <div>
                    <Link className="links" to={`/author/${author._id}`}>
                      {author.full_name}
                    </Link>
                    {
                      <div className="grid2">
                        <p className="pud">
                          Followers : {author.followers.length}
                        </p>
                        <button
                          className="btn33"
                          disabled={isLoading}
                          onClick={followAuthor}
                        >
                          Follow
                        </button>
                      </div>
                    }
                    <p className="pud">{author.about}</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
            <div style={{ padding: 14, display:"block" }} className="App">
      <h1>Comments</h1>
      {console.log(reviews)}
      {reviews.length > 0 &&
        reviews.map((review)=>{
          return(
          <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <a href={`/reader/${review?.user_id?._id}`}>
          <Grid item>
            <Avatar alt="reader" src={review?.user_id?.picture_url} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{review?.user_id?.firstName + " "+ review?.user_id?.lastName}</h4>
            <p style={{ marginTop:'20px', textAlign: "left" }}>
              {review?.review_message}{" "}
            </p>
            
          </Grid>
          </a>
          <Grid>

          <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '15ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            <Button onClick={()=> reportReview(review?.user_id?._id, id, review._id)} >Report</Button>
          </MenuItem>
        ))}
      </Menu>

          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        </Paper>
        )})
        
      
      }

          </div>
        
          <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Review(optional)</DialogTitle>
        <DialogContent>
          <DialogContentText>
           You can add a review to your rates
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Review"
            type="text"
            fullWidth
            onChange={(e)=> setReview(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={submitReview}>Submit</Button>
        </DialogActions>
      </Dialog>

        </div>
      </section>
    </>
  );
};

export default Services;
