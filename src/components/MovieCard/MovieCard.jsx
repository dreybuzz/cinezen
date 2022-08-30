import { BASE_MOVIE_IMAGES_URL } from "../../constants/helperFunctions"
import BuyNowOverlay from "../BuyNowOverlay/BuyNowOverlay"
export default function MovieCard({ movie }) {
  return (
    <div className="group bg-black text-white cursor-pointer hover:scale-105 ease-in-out duration-500 flex h-96 relative rounded-lg">
      {/* Trailer */}
      <div className="absolute top-2 left-2 text-black w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shadow-2xl z-10 group-hover:bg-black group-hover:text-green-400 ease-linear duration-500">
        <i class="fa-solid fa-film text-lg"></i>
      </div>

      {/* Buy Now */}
      <BuyNowOverlay
        movie={movie?.title}
        classNames={`scale-[0.6] rounded-lg shadow-xl opacity-0 ease-linear duration-500 group-hover:opacity-100`}
      />

      {/* Image */}
      <div className="flex-1 bg-transparent">
        <img
          src={BASE_MOVIE_IMAGES_URL + movie?.poster_path}
          alt=""
          className="h-full object-cover rounded-lg group-hover:blur-sm"
        />
      </div>

      {/* Synopsis */}
      <div className="p-3 overflow-y-scroll text-xs lg:text-sm w-[40%]">
        {movie.overview}
      </div>
    </div>
  )
}
