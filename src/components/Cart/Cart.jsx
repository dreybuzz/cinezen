import { useContext, useState } from "react"
import { MovieAPIContext } from "../../contexts/MovieAPIContext"
import { getParsedDate } from "../../constants/helperFunctions"
import { cinemas } from "../../constants/cinemas"
import "./Cart.css"

export default function Cart() {
  const { cart, cartByMovie, cartByCinema, updateCart } =
    useContext(MovieAPIContext)

  const [activeTab, setActiveTab] = useState("tickets")

  const ItemContainer = ({
    leftIcon,
    itemTitle,
    rightIcon,
    rightIconFunc,
    toggleOptionsShownFunc,
    bgColor = null,
  }) => {
    return (
      <>
        {/* Items Details */}
        <div
          className={`shadow-xl rounded-xl p-3 ease-linear transition-all duration-150 hover:scale-105 flex flex-1 justify-between items-center gap-3 ${
            bgColor || "bg-slate-900"
          }`}
          onClick={toggleOptionsShownFunc}>
          {/* Left Icon & Title */}
          <div className="flex items-center gap-2">
            {/* Left Icon */}
            <div>{leftIcon}</div>

            {/* Title */}
            <div>{itemTitle}</div>
          </div>

          {/* Right Icon */}
          <div className="text-red-500 font-extrabold" onClick={rightIconFunc}>
            {rightIcon}
          </div>
        </div>
      </>
    )
  }

  const TicketOptions = ({ ticket, shown = true }) => {
    const [cinema, setCinema] = useState(ticket.cinema)
    const [selectedCinemaIndex, setSelectedCinemaIndex] = useState(
      ticket.cinemaIndex
    )
    const [branch, setBranch] = useState(ticket.branch)
    const [date, setDate] = useState(ticket.date)
    const [time, setTime] = useState(ticket.time)
    return (
      <div
        className={`flex flex-col ease-linear duration-200 h-fit mx-3 overflow-hidden ${
          shown ? "bg-slate-900 shadow-2xl p-3 rounded-b-xl" : " h-0"
        }`}>
        {/* Filters */}
        <div className="flex flex-wrap gap-5 justify-around w-full">
          {/* Select Cinema */}
          <div className="w-[45%]">
            <select
              name="movies"
              className="movies-grid-filter-select bg-slate-800 "
              value={cinema || ""}
              onChange={(e) => {
                setCinema(e.target.value)
                setSelectedCinemaIndex(
                  e.target.selectedOptions[0].getAttribute("data-index")
                )
              }}>
              <option value={""} disabled>
                Cinemas
              </option>
              {cinemas.map((cinema, index) => {
                return (
                  <option key={cinema.id} value={cinema.id} data-index={index}>
                    {cinema.title}
                  </option>
                )
              })}
            </select>
          </div>

          {/* Select Branch */}
          <div className="w-[45%]">
            <select
              disabled={selectedCinemaIndex == null}
              name="movies"
              className="movies-grid-filter-select bg-slate-800 "
              value={branch || ""}
              onChange={(e) => {
                setBranch(() => e.target.value)
              }}>
              <option value="" disabled>
                Branch
              </option>
              {cinema &&
                selectedCinemaIndex &&
                cinemas[selectedCinemaIndex].branches.map((location, index) => {
                  return (
                    <option key={location.id} value={location.id}>
                      {location.branch}
                    </option>
                  )
                })}
            </select>
          </div>

          {/* Select Date */}
          <div className="flex justify-center w-[45%] ">
            <input
              type="date"
              placeholder="Date"
              className="movies-grid-filter-select placeholder:text-white text-white p-3 bg-slate-800 "
              value={date || getParsedDate()}
              onChange={(e) => {
                setDate(() => e.target.value)
              }}
            />
          </div>

          {/* Select Time */}
          <div className="flex justify-center w-[45%] ">
            <select
              disabled={selectedCinemaIndex == null}
              name="movies"
              className="movies-grid-filter-select bg-slate-800 "
              value={time || ""}
              onChange={(e) => {
                setTime(e.target.value)
              }}>
              <option value={""}>Time</option>
              {cinema &&
                selectedCinemaIndex &&
                cinemas[selectedCinemaIndex].showTimes.map((time, index) => {
                  return (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  )
                })}
            </select>
          </div>
        </div>

        {/* Add Snack */}
        <div className="flex items-center justify-center my-5">
          <button className="btn scale-75 hover:scale-90">
            <i className="fa-solid fa-burger"></i> Add Snack
          </button>
        </div>
      </div>
    )
  }

  const CartTicket = ({ item, ticketOptionsShown = false, misc = "" }) => {
    const [showTicketOptions, setShowTicketOptions] =
      useState(ticketOptionsShown)
    return (
      <div className="flex flex-col p-2">
        <ItemContainer
          leftIcon={<i className="fa-solid fa-ticket"></i>}
          itemTitle={item.title}
          rightIcon={<i className="fa-solid fa-xmark"></i>}
          rightIconFunc={() => updateCart("delete", item)}
          optionsShown={showTicketOptions}
          toggleOptionsShownFunc={() =>
            setShowTicketOptions(() => !showTicketOptions)
          }
          bgColor={misc}
        />
        {/* Ticket Options */}
        <TicketOptions ticket={item} shown={showTicketOptions} />
      </div>
    )
  }

  const CartMovie = ({ item, movieOptionsShown = false }) => {
    const [showMovieOptions, setShowMovieOptions] = useState(movieOptionsShown)
    return (
      <div className="flex flex-col p-2">
        <ItemContainer
          leftIcon={<i className="fa-solid fa-film"></i>}
          itemTitle={item.title}
          rightIcon={<i className="fa-solid fa-xmark"></i>}
          rightIconFunc={() => updateCart("delete", item)}
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
        <ItemContainer
          leftIcon={<i className="fa-solid fa-location-crosshairs"></i>}
          itemTitle={item.title || "No Cinema Selected"}
          rightIcon={<i className="fa-solid fa-xmark"></i>}
          rightIconFunc={() => updateCart("delete", item)}
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

  //   const CinemaOptions = ({ movie, number = null, shown }) => {
  //     return <CartTicket item={movie} misc="bg-slate-700" />
  //   }

  return (
    <div className="flex flex-col flex-1 overflow-scroll">
      {/* Title */}
      <div className="flex flex-col gap-4 justify-center items-center font-semibold font-sen md:text-lg sticky top-0">
        <span className="fw-bold">Cart Items</span>
        <span className="flex justify-around items-center w-full mb-3">
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
