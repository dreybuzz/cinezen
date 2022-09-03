import { useContext, useState } from "react"
import { MovieAPIContext } from "../../contexts/MovieAPIContext"
import { getParsedDate } from "../../constants/helperFunctions"
import { cinemas } from "../../constants/cinemas"
import "./Cart.css"
import CartItem from "./CartItem"
import TicketOptions from "./TicketOptions"
import CartTicket from "./CartTicket"

export default function Cart({}) {
  const { cart, cartByMovie, cartByCinema, updateCart } =
    useContext(MovieAPIContext)

  const [activeTab, setActiveTab] = useState("tickets")

  const CartMovie = ({ item, movieOptionsShown = false }) => {
    const [showMovieOptions, setShowMovieOptions] = useState(movieOptionsShown)
    return (
      <div className="flex flex-col p-2">
        <CartItem
          leftIcon={<i className="fa-solid fa-film"></i>}
          itemTitle={item.title}
          rightIcon={<i className="fa-solid fa-xmark"></i>}
          rightIconFunc={() => {
            for (let i = 0; i < cart.length; i++) {
              if (cart[i].movie === item.movie) {
                for (let j = 0; j < item.tickets.length; j++) {
                  updateCart("delete", item.tickets[j], "movie")
                }
              }
            }
          }}
          optionsShown={showMovieOptions}
          toggleOptionsShownFunc={() =>
            setShowMovieOptions(() => !showMovieOptions)
          }
        />

        {/* Movie Options */}
        <div
          className={`flex flex-col ease-linear duration-200  h-fit mx-3 overflow-hidden ${
            showMovieOptions
              ? "bg-slate-900 shadow-2xl p-3 rounded-b-xl"
              : " h-0"
          }`}>
          {item.tickets.map((movie, index) => (
            <MovieOptions
              key={index}
              movie={movie}
              shown={showMovieOptions}
              number={index + 1}
            />
          ))}
        </div>
      </div>
    )
  }

  const MovieOptions = ({ movie, number = null, shown }) => {
    const parsedMovie = {
      ...movie,
      title: `${number && number + ". "}Ticket`,
    }
    return <CartTicket item={parsedMovie} misc="bg-slate-700" />
  }

  const CartCinema = ({ item, cinemaOptionsShown = false }) => {
    const [showCinemaOptions, setShowCinemaOptions] =
      useState(cinemaOptionsShown)
    return (
      <div className="flex flex-col p-2">
        <CartItem
          leftIcon={<i className="fa-solid fa-location-crosshairs"></i>}
          itemTitle={item.title || "No Cinema Selected"}
          rightIcon={<i className="fa-solid fa-xmark"></i>}
          rightIconFunc={() => {
            for (let i = 0; i < cart.length; i++) {
              if (cart[i].cinema === item.cinema) {
                for (let j = 0; j < item.tickets.length; j++) {
                  updateCart("delete", item.tickets[j], "cinema")
                }
              }
            }
          }}
          optionsShown={showCinemaOptions}
          toggleOptionsShownFunc={() =>
            setShowCinemaOptions(() => !showCinemaOptions)
          }
        />

        {/* Cinema Options */}
        <div
          className={`flex flex-col ease-linear duration-200  h-fit mx-3 overflow-hidden ${
            showCinemaOptions
              ? "bg-slate-900 shadow-2xl p-3 rounded-b-xl"
              : " h-0"
          }`}>
          {item.tickets.map((movie, index) => {
            return <CartTicket key={index} item={movie} misc="bg-slate-700" />
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-scroll">
      {/* Title */}
      <div className="flex flex-col justify-center items-center font-semibold font-sen md:text-lg sticky top-0">
        {/* Header */}
        <span className="fw-bold flex justify-between items-center w-full border-b-black border-b-2 bg-slate-900 p-3">
          <i className="fa-solid fa-trash"></i>
          <span>Cart Items</span>
          <i className="fa-solid fa-right-from-bracket cursor-pointer"></i>
        </span>

        {/* Sort Groups */}
        <span className="flex justify-around items-center w-full mb-3 bg-slate-800 p-3 text-sm z-10">
          <button
            className={`cart-tab ${activeTab === "tickets" && "active-tab"}`}
            onClick={() => {
              setActiveTab(() => "tickets")
            }}>
            Tickets
          </button>
          <button
            className={`cart-tab ${activeTab === "movies" && "active-tab"}`}
            onClick={() => {
              setActiveTab(() => "movies")
            }}>
            Movies
          </button>
          <button
            className={`cart-tab ${activeTab === "cinemas" && "active-tab"}`}
            onClick={() => {
              setActiveTab(() => "cinemas")
            }}>
            Cinemas
          </button>
        </span>
      </div>

      {/* Sort By Ticket */}
      {activeTab === "tickets" &&
        cart.map((cartItem, index) => {
          return (
            <div className="mb-3" key={index}>
              <CartTicket key={index} item={cartItem} />
            </div>
          )
        })}

      {/* Sort By Movie */}
      {activeTab === "movies" &&
        cartByMovie.map((item, index) => {
          return (
            <div key={index} className="mb-3">
              <CartMovie key={index} item={item} />
            </div>
          )
        })}

      {/* Sort By Cinema */}
      {activeTab === "cinemas" &&
        cartByCinema.map((item, index) => {
          return (
            <div key={index} className="mb-3">
              <CartCinema key={index} item={item} />
            </div>
          )
        })}
    </div>
  )
}
