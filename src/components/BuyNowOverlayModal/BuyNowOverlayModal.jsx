import React, { useContext, useEffect } from "react"
import { MovieAPIContext } from "../../contexts/MovieAPIContext"
import "./BuyNowOverlayModal.css"
import { BASE_MOVIE_IMAGES_URL } from "../../constants/helperFunctions"
import CartItem from "../Cart/CartItem"
import CartTicket from "../Cart/CartTicket"

export default function BuyNowOverlayModal({
  shown = true,
  toggleVisibilityFunc = () => {},
}) {
  const {
    buyNowMovie,
    buyNowMovieQuantity,
    setBuyNowMovieQuantity,
    nowPlayingIntl,
  } = useContext(MovieAPIContext)

  function getMovie(id) {
    for (let i = 0; i < nowPlayingIntl.length; i++) {
      if (id === nowPlayingIntl[i].id) {
        return nowPlayingIntl[i]
      }
    }
    return false
  }
  const movie = getMovie(buyNowMovie)

  useEffect(() => {
    !buyNowMovieQuantity &&
      toggleVisibilityFunc(false) &&
      setBuyNowMovieQuantity(1)
  }, [buyNowMovieQuantity])

  return (
    // Modal
    <div
      className={`fixed w-screen h-screen z-30 top-0 bg-black/80 text-white flex items-center justify-center ease-linear duration-500 ${
        !shown && "scale-0"
      }`}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return
        toggleVisibilityFunc(false)
      }}>
      {/* Close  */}
      <div
        className="absolute text-2xl top-0 font-bold right-10 cursor-pointer hover:scale-110 ease-linear duration-200 rounded-full bg-slate-600/60 p-3 h-10 w-10 flex items-center justify-center hover:bg-black"
        onClick={(e) => {
          e.stopPropagation()
          toggleVisibilityFunc(false)
        }}>
        X
      </div>
      <div className="w-1/3 h-[85%] bg-slate-800 rounded-xl shadow-2xl overflow-scroll flex flex-col">
        {/* Image */}
        <div className="">
          <img
            src={BASE_MOVIE_IMAGES_URL + movie.backdrop_path}
            alt=""
            className="object-cover"
          />
        </div>

        {/* Tickets */}
        <div className="font-bold mt-3 overflow-scroll">
          {Array.from(Array(buyNowMovieQuantity), (blank, index) => {
            return (
              <div className="mb-3 mx-3" key={index}>
                <CartTicket
                  item={{ movie: movie.id, title: movie.title }}
                  misc="bg-slate-700 cursor-pointer capitalize"
                  itemRightIconFunc={() => {
                    setBuyNowMovieQuantity(() => buyNowMovieQuantity - 1)
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Buy Button */}
        {
          <div className="self-center">
            <button className="btn">
              <i className="fa-solid fa-money-check"></i> Buy
            </button>
          </div>
        }
      </div>
    </div>
  )
}
