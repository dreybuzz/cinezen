// import { useContext, useEffect, useState } from "react"

// export default function MovieFilters({ filters = [] }) {
//   const [movie, setMovie] = useState(filters[0].state)
//   const [cinema, setCinema] = useState(filters[1].state)
//   const [selectedCinemaIndex, setSelectedCinemaIndex] = useState(null)
//   const [branch, setBranch] = useState(filters[2].state)
//   const [date, setDate] = useState(filters[3].state)
//   const [time, setTime] = useState(filters[4].state)

//   const parsedFilters = {
//     movie,
//     cinema,
//     branch,
//     date,
//     time,
//   }

//   return (
//     <>
//       {/* Filters */}
//       <div className="border-emerald-300 bg-black flex flex-wrap gap-5 justify-center items-center p-5">
//         {/* Select Movie */}
//         <div className="flex justify-center w-36">
//           <select
//             name="movies"
//             className="movies-grid-filter-select"
//             value={movie || ""}
//             onChange={(e) => {
//               filters[0].set(e.target.value)
//               setMovie(e.target.value)
//               //   setMovies([
//               //     nowPlayingIntl[
//               //       e.target.selectedOptions[0].getAttribute("data-index")
//               //     ],
//               //   ])
//             }}>
//             <option value={""} disabled>
//               Movie
//             </option>
//             {nowPlayingIntl.map((movie, index) => {
//               return (
//                 <option key={movie?.id} value={movie?.id} data-index={index}>
//                   {movie?.title}
//                 </option>
//               )
//             })}
//           </select>
//         </div>

//         {/* Select Cinema */}
//         <div className="flex justify-center w-36">
//           <select
//             name="movies"
//             className="movies-grid-filter-select"
//             value={cinema || ""}
//             onChange={(e) => {
//               setCinema(e.target.value)
//               setSelectedCinemaIndex(
//                 e.target.selectedOptions[0].getAttribute("data-index")
//               )
//             }}>
//             <option value={""} disabled>
//               Cinema
//             </option>
//             {cinemas.map((cinema, index) => {
//               return (
//                 <option key={cinema.id} value={cinema.id} data-index={index}>
//                   {cinema.title}
//                 </option>
//               )
//             })}
//           </select>
//         </div>

//         {/* Select Branch */}
//         <div className="flex justify-center w-36">
//           <select
//             disabled={selectedCinemaIndex == null}
//             name="movies"
//             className="movies-grid-filter-select"
//             value={branch || ""}
//             onChange={(e) => {
//               setBranch(() => e.target.value)
//             }}>
//             <option value="" disabled>
//               Branch
//             </option>
//             {cinema &&
//               selectedCinemaIndex &&
//               cinemas[selectedCinemaIndex].locations.map((location, index) => {
//                 return (
//                   <option key={location.id} value={location.id}>
//                     {location.branch}
//                   </option>
//                 )
//               })}
//           </select>
//         </div>

//         {/* Select Date */}
//         <div className="flex justify-center w-36">
//           <input
//             type="date"
//             placeholder="Date"
//             className="movies-grid-filter-select placeholder:text-black text-black p-3"
//             value={date || getParsedDate()}
//             onChange={(e) => {
//               setDate(() => e.target.value)
//             }}
//           />
//         </div>

//         {/* Select Time */}
//         <div className="flex justify-center w-36">
//           <select
//             disabled={selectedCinemaIndex == null}
//             name="movies"
//             className="movies-grid-filter-select"
//             value={time || ""}
//             onChange={(e) => {
//               setTime(e.target.value)
//             }}>
//             <option value={""}>Time</option>
//             {cinema &&
//               selectedCinemaIndex &&
//               cinemas[selectedCinemaIndex].showTimes.map((time, index) => {
//                 return (
//                   <option key={index} value={time}>
//                     {time}
//                   </option>
//                 )
//               })}
//           </select>
//         </div>
//       </div>
//     </>
//   )
// }
