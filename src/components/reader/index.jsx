
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

const Reader = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState({ type: "", message: "" });
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const [alreadyFollowing, setAlreadyFollowing] = useState(false);

    const [profile, setReader] = useState({
        firstName: "",
        lastName:"",
        followers: [],
        following_authors:[],
        following_readers:[],
        picture_url: "",
        bio: "",
        _id: ""
    });

    const fetchReader = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/user/readerprofile/${id}`);

            if (response?.data?.status === "SUCCESS") {
                setReader(response.data.data.user);
                console.log("here", response.data.data.user)
            response.data.data.user.following_readers.filter((reader)=>{
                console.log("reader", reader)
                if(reader.user._id === id){
                    setAlreadyFollowing(true)
                }
            })
            console.log(response.data.data.user)
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const followReader = async () => {
        setIsLoading(true);
    
        try {
          const response = await axios.patch(
            `/user/followreader`,
            { id: profile._id }
          );
          /*error*/
          /*error*/
          /*error*/
          /*error*/
          /*error*/
    
        //   setReader(response.data.data.user);
          alert("You are now following the author!");
          alreadyFollowing(true)
    
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          error?.response && alert(error?.response?.data?.message);
        }
      };

    const unFollowReader = async () => {
        setIsLoading(true);
    
        try {
          await axios.patch(
            `/user/unfollowreader`,
            { id: profile._id }
          );
          /*error*/
          /*error*/
          /*error*/
          /*error*/
          /*error*/
    
        //   setReader(response.data.data.user);
          alert("You have now unfollowed the reader!");
          alreadyFollowing(false)
    
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          error?.response && alert(error?.response?.data?.message);
        }
      };

    useEffect(() => {
        fetchReader();
    }, []);


    return (
        <section className="services mb">
            <Back name="Book" title="Reader" cover={img} />
            <div className="featured container">
                <div style={{display: 'flex'}} className="profile-detail">
                    <div className="aa">
                        <img
                            className="Reader"
                            src={profile.picture_url}
                            alt={profile.firstName}
                        />
                    </div>

                    <div style={{marginLeft:"30px"}}>
                        <h2>{profile.firstName + profile.lastName}</h2>

                        <p className="pud">{profile.bio}</p>

                        <div style={{display:"flex"}}>

                        </div>
                    </div>
                    </div>
                    {(storedData.user.id !== profile._id && !alreadyFollowing) && <div className="grid2">
                        <button
                            className="btn33"
                            disabled={isLoading}
                            onClick={followReader}
                        >
                            Follow
                        </button>
                    </div>}
                    {(alreadyFollowing) && <div className="grid2">
                        <button
                            className="btn33"
                            disabled={isLoading}
                            onClick={unFollowReader}
                        >
                            Follow
                        </button>
                    </div>}
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
                                        {user.about}
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
                        {console.log(profile.followers)}
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
                                        {user.bio}
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

export default Reader;