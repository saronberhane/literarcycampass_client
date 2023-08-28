import React from "react";

const FeaturedCard = ({ item }) => {
  console.log(item)
  return (
    <>
      <div className="box" key={item._id}>
        <img src={item.cover_url} className="image-book" alt={item.title} />
        <h4>{item.title}</h4>
        {/* <label>{item.total}</label> */}
      </div>
    </>
  );
};

export default FeaturedCard;
