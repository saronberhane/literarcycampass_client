import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Highly Rated Books' subtitle='Discover the top rated books that are the most amazing five star books everyone should also read during their lifestyle, including you!' />
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Recent
