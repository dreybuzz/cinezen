import { useState } from "react"

export default function BuyNowOverlay({ movie = "", classNames = "" }) {
  const [ticketAmount, setTicketAmount] = useState("1")
  const [slideAnimation, setSlideAnimation] = useState("")

  return (
    <div
      className={`z-10 flex flex-col justify-center items-center gap-2 backdrop-opacity-40 backdrop-invert bg-white/30 w-fit h-fit p-5 px-0 sm:p-10 absolute top-1/2 -translate-y-1/2 mx-auto left-0 right-0 ${classNames} `}>
      <div
        className={`font-bold mb-2 text-xs sm:text-base md:text-lg xl:text-2xl text-center ${slideAnimation}`}>
        <i className="fa-solid fa-film"></i> {movie.toUpperCase()}
      </div>
      <div className="flex justify-center items-center gap-4 mb-3">
        <button
          className="tickets-amount-btn"
          onClick={() => {
            Number(ticketAmount) > 1 && setTicketAmount(() => ticketAmount - 1)
          }}>
          -
        </button>
        <input
          type="text"
          className="p-1 sm:p-2 rounded-lg w-1/6 text-center text-black"
          value={ticketAmount}
          onChange={() => {
            setTicketAmount(() => {})
          }}
          readOnly
        />
        <button
          className="tickets-amount-btn"
          onClick={() => {
            Number(ticketAmount) < 10 &&
              setTicketAmount(() => Number(ticketAmount) + 1)
          }}>
          +
        </button>
      </div>
      <button className="btn text-3xs">
        <i className="fa-solid fa-ticket"></i> Buy Tickets
      </button>
      <button className="btn text-3xs">
        <i className="fa-solid fa-cart-plus"></i> Add To Cart
      </button>
    </div>
  )
}
