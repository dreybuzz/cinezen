import { useContext, useState } from "react"
import { MovieAPIContext } from "../../contexts/MovieAPIContext"
import { getParsedDate } from "../../constants/helperFunctions"

export default function TicketOptions({ ticket, shown = true }) {
  const { cinemas } = useContext(MovieAPIContext)
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
