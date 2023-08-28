
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import img from "../images/services.jpg";
import Back from "../common/Back";
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Profile = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState({ type: "", message: "" });

    const [profile, setProfile] = useState({
        firstName: "",
        lastName:"",
        email: "",
        followers: [],
        following_authors:[],
        following_readers:[],
        picture_url: "",
        bio: "",
        _id: ""
    });

    const [profileedBooks, setProfileedBooks] = useState([]);

    const fetchProfile = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/user/profile`);

            setProfile(response.data.data.user);
            console.log(response.data.data.user)

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    // const followProfile = async () => {
    //     setIsLoading(true);

    //     try {
    //         const response = await axios.patch(
    //             `/user/followprofile`,
    //             { id: profile._id }
    //         );

    //         setProfile(response.data.data.profile);
    //         alert("You are now following the profile!");

    //         setIsLoading(false);
    //     } catch (error) {
    //         setIsLoading(false);
    //         error?.response && alert(error?.response?.data?.message);
    //     }
    // };

    // const fetchProfileedBooks = async () => {
    //     setIsLoading(true);
    //     try {
    //         const response = await axios.get(`/book/byprofileid/${id}`, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         // setBook(response.data.data);
    //         // console.log(response.data.data.profile);
    //         setProfileedBooks(response.data.data.books);
    //         // console.log(response.data.data.books);

    //         setIsLoading(false);
    //     } catch (error) {
    //         setIsLoading(false);
    //     }
    // };

    useEffect(() => {
        fetchProfile();
    }, []);

    // useEffect(() => {
    //     fetchProfileedBooks();
    // }, []);

    return (
        <section className="services mb">
            <Back name="Book" title="Profile" cover={img} />
            <div className="featured container">
                <div style={{display: 'flex'}} className="profile-detail">
                    <div className="aa">
                        <img
                            className="Profile"
                            src={profile.picture_url}
                            alt={profile.firstName}
                        />
                    </div>

                    <div style={{marginLeft:"30px"}}>
                        <h2>{profile.firstName + profile.lastName}</h2>
                        <p>email : {profile.email}</p>

                        <p className="pud">{profile.bio}</p>

                        <div style={{display:"flex"}}>

                        </div>
                    </div>
                    </div>
                    <div style={{marginTop:"40px"}}>
                        <h3>Following Authors</h3>

                        {profile.following_authors.length >0 &&
                        profile.following_authors.map((user)=>{
                            return (
                                <>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="follower" src={user.picture_url} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.full_name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                        </Typography>
                                        {user.about.slice(0, 100)}...
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="ul" />
                        </>
                            )
                        })
                        
                        }
                    </div>
                   
                    <div style={{marginTop:"40px"}}>
                        <h3>Following Readers</h3>

                        {profile.followers.length >0 &&
                        profile.followers.map((user)=>{
                            return (
                                <>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="follower" src={user.picture_url} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.firstName + ' '+ user.lastName}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                        </Typography>
                                        {user.bio.slice(0, 100)}...
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="ul" />
                        </>
                            )
                        })
                        
                        }
                    </div>
            </div>
        </section>
    );
};

export default Profile;