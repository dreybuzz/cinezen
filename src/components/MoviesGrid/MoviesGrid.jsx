import { useContext, useEffect, useState } from "react"
import { MovieAPIContext } from "../../contexts/MovieAPIContext"
import { getParsedDate } from "../../constants/helperFunctions"
import MovieCard from "../MovieCard/MovieCard"
import { cinemas } from "../../constants/cinemas"

export default function MoviesGrid() {
  const { nowPlayingIntl } = useContext(MovieAPIContext)
  const [movies, setMovies] = useState(nowPlayingIntl)
  const [movie, setMovie] = useState(null)
  const [cinema, setCinema] = useState(null)
  const [selectedCinemaIndex, setSelectedCinemaIndex] = useState(null)
  const [branch, setBranch] = useState(null)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)

  useEffect(() => {
    setMovies(() => nowPlayingIntl)
  }, [nowPlayingIntl])

  // useEffect(() => {})

  return (
    <div className="border-red-900 flex flex-col mb-14 min-h-[50rem]">
      {/* Filters */}
      <div className="border-emerald-300 bg-black flex flex-wrap gap-5 justify-center items-center p-5">
        {/* Select Movie */}
        <div className="flex justify-center w-36">
          <select
            name="movies"
            className="movies-grid-filter-select"
            value={movie || ""}
            onChange={(e) => {
              setMovie(e.target.value)
              setMovies(() =>
                e.target.value.length
                  ? [
                      nowPlayingIntl[
                        e.target.selectedOptions[0].getAttribute("data-index")
                      ],
                    ]
                  : nowPlayingIntl
              )
            }}>
            <option value={""}>Movies</option>
            {nowPlayingIntl.map((movie, index) => {
              return (
                <option key={movie?.id} value={movie?.id} data-index={index}>
                  {movie?.title}
                </option>
              )
            })}
          </select>
        </div>

        {/* Select Cinema */}
        <div className="flex justify-center w-36">
          <select
            name="movies"
            className="movies-grid-filter-select"
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
        <div className="flex justify-center w-36">
          <select
            disabled={selectedCinemaIndex == null}
            name="movies"
            className="movies-grid-filter-select"
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
        <div className="flex justify-center w-36">
          <input
            type="date"
            placeholder="Date"
            className="movies-grid-filter-select placeholder:text-black text-black p-3"
            value={date || getParsedDate()}
            onChange={(e) => {
              setDate(() => e.target.value)
            }}
          />
        </div>

        {/* Select Time */}
        <div className="flex justify-center w-36">
          <select
            disabled={selectedCinemaIndex == null}
            name="movies"
            className="movies-grid-filter-select"
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

      {/* Grid */}
      <div className="flex flex-wrap justify-evenly items-center py-6 px-6 gap-5 gap-y-10">
        {movies.map((movie, index) => (
          <div key={index} className="movie-card">
            <MovieCard
              movie={movie}
              cinema={cinema}
              cinemaIndex={selectedCinemaIndex}
              branch={branch}
              date={date}
              time={time}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
