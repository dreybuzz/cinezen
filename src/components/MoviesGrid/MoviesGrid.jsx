import { useContext } from "react"
import { MovieAPIContext } from "../../contexts/MovieAPIContext"
import MovieCard from "../MovieCard/MovieCard"

export default function MoviesGrid() {
  function getParsedDate() {
    let date = new Date("2013-08-03T02:00:00Z")
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let dt = date.getDate()

    if (dt < 10) {
      dt = "0" + dt
    }
    if (month < 10) {
      month = "0" + month
    }

    return year + "-" + month + "-" + dt
  }

  const { nowPlayingLocal, nowPlayingIntl } = useContext(MovieAPIContext)

  return (
    <div className="border-red-900 flex flex-col mb-14 min-h-[50rem]">
      {/* Filters */}
      <div className="border-emerald-300 bg-black flex flex-wrap gap-5 justify-center items-center p-5">
        {/* Select Movie */}
        <div className="flex justify-center w-36">
          <select name="movies" className="movies-grid-filter-select">
            <option value="">Movie</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
          </select>
        </div>

        {/* Select Cinema */}
        <div className="flex justify-center w-36">
          <select name="movies" className="movies-grid-filter-select">
            <option value="">Cinema</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
          </select>
        </div>

        {/* Select Branch */}
        <div className="flex justify-center w-36">
          <select disabled name="movies" className="movies-grid-filter-select">
            <option value="">Location</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
          </select>
        </div>

        {/* Select Date */}
        <div className="flex justify-center w-36">
          <input
            disabled
            type="date"
            placeholder="Date"
            className="movies-grid-filter-select placeholder:text-black text-black p-3"
            value={getParsedDate()}
            onChange={() => {}}
          />
        </div>

        {/* Select Time */}
        <div className="flex justify-center w-36">
          <select disabled name="movies" className="movies-grid-filter-select">
            <option value="">Time</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="flex flex-wrap justify-evenly items-center py-6 gap-5 gap-y-10 max-h-[75vh] overflow-y-scroll">
        {nowPlayingIntl.map((movie, index) => (
          <div key={index} className="movie-card">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  )
}
