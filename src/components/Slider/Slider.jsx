import { useContext, useEffect, useRef, useState } from "react"
import { MovieAPIContext } from "../../contexts/MovieAPIContext"
import { BASE_MOVIE_IMAGES_URL } from "../../constants/helperFunctions"
import BuyNowOverlay from "../BuyNowOverlay/BuyNowOverlay"

export default function Slider() {
  const sliderRef = useRef()
  const { nowPlayingLocal, nowPlayingIntl } = useContext(MovieAPIContext)
  const [visibleImageIndex, setVisibleImageIndex] = useState(0)
  const [slideAnimation, setSlideAnimation] = useState("")

  const RenderMovieBackdrop = ({ movie }) => {
    return (
      <div
        className={`basis-full shrink-0 flex items-center justify-center ${slideAnimation}`}>
        <img
          src={
            BASE_MOVIE_IMAGES_URL + movie?.backdrop_path || movie.poster_path
          }
          className="h-full object-cover"
          alt={movie?.title}
        />
      </div>
    )
  }

  const Arrows = ({ classNames = "" }) => {
    return (
      <div
        className={`z-10 flex justify-between absolute w-full carousel-arrows top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 ease-linear duration-700 ${classNames}`}>
        {/* Left */}
        <div
          className="carousel-arrow"
          onClick={() => {
            setSlideAnimation("rotate-in-2-cw")
            setVisibleImageIndex(() =>
              visibleImageIndex == 0
                ? nowPlayingIntl.length - 1
                : visibleImageIndex - 1
            )
            // setSlideAnimation("")
          }}>
          <i className="fa-solid fa-angle-left"></i>
        </div>

        {/* Right */}
        <div
          className="carousel-arrow"
          onClick={() => {
            setSlideAnimation("puff-in-right")
            setVisibleImageIndex(() =>
              visibleImageIndex == nowPlayingIntl.length - 1
                ? 0
                : visibleImageIndex + 1
            )
            // setSlideAnimation("")
          }}>
          <i className="fa-solid fa-angle-right"></i>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Arrows - XL Screens */}
      <Arrows classNames="hidden xl:flex" />
      {nowPlayingIntl && (
        <BuyNowOverlay
          classNames="hidden xl:flex"
          movie={nowPlayingIntl[visibleImageIndex]}
        />
      )}
      <div className="min-h-[29.333vh] h-fit max-h-[85%] bg-emerald-900 overflow-y-scroll relative ease-linear duration-1000">
        {/* Arrows */}
        <Arrows classNames="xl:hidden" />
        <BuyNowOverlay
          classNames="xl:hidden scale-75 sm:scale-100"
          movie={nowPlayingIntl[visibleImageIndex]}
        />
        {nowPlayingIntl[visibleImageIndex] && (
          <div className="flex" ref={sliderRef}>
            <RenderMovieBackdrop movie={nowPlayingIntl[visibleImageIndex]} />
          </div>
        )}
      </div>
    </>
  )
}
