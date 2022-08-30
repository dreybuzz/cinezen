import { useContext, useEffect, useRef, useState } from "react"
import { MovieAPIContext } from "../../contexts/MovieAPIContext"
import { BASE_MOVIE_IMAGES_URL } from "../../constants/helperFunctions"

import cinemas from "./../../assets/img/cinemas.jpg"

export default function Categories() {
  const { nowPlayingLocal, nowPlayingIntl, upcoming } =
    useContext(MovieAPIContext)

  const CategoryText = ({ title = "Hello World", buttonText = "View" }) => {
    return (
      <div className="category-text text-gray-50">
        <div className="font-bold font-sen md:text-lg xl:text-2xl">{title}</div>
        <div>
          <button className="btn">{buttonText}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-10 flex flex-wrap gap-5 justify-center items-center mt-5 mb-10">
      {/* Cinemas */}
      <div className="category">
        <img src={cinemas} alt="Cinemas" className="category-image" />
        <CategoryText title="Cinemas" />
      </div>

      {/* Now Showing */}
      <div className="category">
        <img
          src={BASE_MOVIE_IMAGES_URL + nowPlayingIntl[0]?.poster_path}
          alt="Now Showing"
          className="category-image"
        />
        <CategoryText title="Now Showing" />
      </div>

      {/* Upcoming */}
      <div className="category">
        <img
          src={BASE_MOVIE_IMAGES_URL + upcoming[0]?.poster_path}
          alt="Upcoming Movies"
          className="category-image"
        />
        <CategoryText title="Upcoming Titles" />
      </div>
    </div>
  )
}
