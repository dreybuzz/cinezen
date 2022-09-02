import { BASE_MOVIE_IMAGES_URL } from "../../constants/helperFunctions"
import BuyNowOverlay from "../BuyNowOverlay/BuyNowOverlay"
import "./MovieCard.css"

export default function MovieCard({
  movie,
  cinema = null,
  cinemaIndex = null,
  branch = null,
  date = null,
  time = null,
}) {
  // console.log(cinema, date, time)

  return (
    <div className="bg-black text-white cursor-pointer hover:scale-105 ease-in-out duration-500 flex h-96 relative rounded-lg">
      {/* Trailer */}
      <div className="absolute top-2 left-2 text-black w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shadow-2xl z-10 group-hover:bg-black ease-linear duration-500">
        <i className="fa-solid fa-film text-lg"></i>
      </div>

      {/* Image */}
      <div className="flex-1 bg-transparent movie-card-img overflow-hidden ease-in-out duration-500">
        <img
          src={BASE_MOVIE_IMAGES_URL + movie?.poster_path}
          alt=""
          className="h-full object-cover rounded-lg ease-in-out duration-200"
        />

        {/* Buy Now */}
        <BuyNowOverlay
          movie={movie}
          classNames={`scale-[0.6] rounded-lg shadow-xl opacity-0 ease-linear duration-500 movie-card-buy-now-overlay`}
          cinema={cinema}
          cinemaIndex={cinemaIndex}
          branch={branch}
          date={date}
          time={time}
        />
      </div>

      {/* Synopsis */}
      <div className="p-3 overflow-y-scroll text-xs lg:text-sm w-[40%] ease-linear duration-500">
        {movie?.overview}
      </div>
    </div>
  )
}
