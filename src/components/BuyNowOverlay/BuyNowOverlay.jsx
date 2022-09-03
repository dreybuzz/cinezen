import { useContext, useEffect, useState } from "react"
import { MovieAPIContext } from "../../contexts/MovieAPIContext"
import { v4 as uuidv4 } from "uuid"
import "./BuyNowOverlay.css"

export default function BuyNowOverlay({
  movie = {},
  classNames = "",
  cinema = null,
  cinemaIndex = null,
  branch = null,
  date = null,
  time = null,
}) {
  const {
    updateCart,
    setBuyNowMovie,
    buyNowMovieQuantity,
    setBuyNowMovieQuantity,
    setBuyNowOverlayModalShown,
  } = useContext(MovieAPIContext)

  const [ticketAmount, setTicketAmount] = useState("1")

  return (
    <>
      <div
        className={`z-10 flex flex-col justify-center items-center gap-2 backdrop-opacity-40 backdrop-invert bg-white/30 w-fit h-fit p-5 px-0 sm:p-10 absolute top-1/2 -translate-y-1/2 mx-auto left-0 right-0 ${classNames} `}>
        <div
          className={`font-bold mb-2 text-xs sm:text-base md:text-lg xl:text-2xl text-center`}>
          <i className="fa-solid fa-film"></i>{" "}
          {movie && movie.title && movie.title.toUpperCase()}
        </div>

        <div className="flex justify-center items-center gap-4 mb-3">
          {/* Minus */}
          <button
            className="tickets-amount-btn"
            onClick={() => {
              Number(ticketAmount) > 1 &&
                setTicketAmount(() => Number(ticketAmount) - 1)
              setBuyNowMovieQuantity(() => Number(ticketAmount) - 1)
            }}>
            -
          </button>

          {/* Quantity */}
          <input
            type="text"
            className="p-1 sm:p-2 rounded-lg w-1/6 text-center text-black"
            value={ticketAmount}
            onChange={() => {
              setTicketAmount(() => {})
            }}
            readOnly
          />

          {/* Plus */}
          <button
            className="tickets-amount-btn"
            onClick={() => {
              Number(ticketAmount) < 10 &&
                setTicketAmount(() => Number(ticketAmount) + 1)
              setBuyNowMovieQuantity(() => Number(ticketAmount) + 1)
            }}>
            +
          </button>
        </div>

        {/* Buy Now */}
        <button
          className="btn text-3xs"
          onClick={() => {
            setBuyNowMovie(movie?.id)
            setBuyNowMovieQuantity(ticketAmount)
            setBuyNowOverlayModalShown(true)
          }}>
          <i className="fa-solid fa-ticket"></i> Buy Now
        </button>

        {/* Add To Cart */}
        <button
          className="btn text-3xs"
          onClick={() => {
            for (let i = 0; i < ticketAmount; i++) {
              updateCart("add", {
                id: uuidv4(),
                movie: movie?.id,
                title: movie?.title,
                cinema: cinema,
                cinemaIndex,
                branch,
                date,
                time,
              })
            }
          }}>
          <i className="fa-solid fa-cart-plus"></i> Add To Cart
        </button>
      </div>
    </>
  )
}
