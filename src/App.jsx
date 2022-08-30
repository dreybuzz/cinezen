import Slider from "./components/Slider/Slider"
import Layout from "./Layout"
import { MovieAPIContext } from "./contexts/MovieAPIContext"
import { useEffect, useState } from "react"
import axios from "axios"
import Categories from "./components/Categories/Categories"
import MoviesGrid from "./components/MoviesGrid/MoviesGrid"

const API_KEY = "9e1f73b46b9839eb16cdad61cd9511c8"

export default function App() {
  async function getMovies(url, query, optionalParamData = null) {
    const BASE_URL = `https://api.themoviedb.org/3/`
    try {
      const apiRequest = await axios.get(
        `${BASE_URL + url}?api_key=${API_KEY}&query=${query}${
          optionalParamData || ""
        }`
      )
      return apiRequest.data
    } catch (err) {
      return "An Error Occured - " + err
    }
  }

  // Now Playing - Local
  const [nowPlayingLocal, setNowPlayingLocal] = useState([])
  async function getNowPlayingLocal() {
    try {
      const getNowPlayingLocalRequest = await getMovies(
        "movie/now_playing",
        "",
        "region=ng"
      )
      setNowPlayingLocal(getNowPlayingLocalRequest.results)
    } catch (err) {
      console.log("Error Fetching Now Playing Local Movies " + err)
    }
  }

  // Now Playing - International
  const [nowPlayingIntl, setNowPlayingIntl] = useState([])
  async function getNowPlayingIntl() {
    try {
      const getNowPlayingIntlRequest = await getMovies(
        "movie/now_playing",
        "",
        "region=us"
      )
      setNowPlayingIntl(getNowPlayingIntlRequest.results)
    } catch (err) {
      console.log("Error Fetching Now Playing Int'l Movies " + err)
    }
  }

  // Upcoming
  const [upcoming, setUpcoming] = useState([])
  async function getUpcoming() {
    try {
      const getUpcomingRequest = await getMovies("movie/upcoming")
      setUpcoming(getUpcomingRequest.results)
    } catch (err) {
      console.log("Error Fetching Upcoming Movies " + err)
    }
  }

  useEffect(() => {
    getNowPlayingLocal()
    getNowPlayingIntl()
    getUpcoming()
  }, [])

  return (
    <MovieAPIContext.Provider
      value={{ nowPlayingLocal, nowPlayingIntl, upcoming }}>
      <Layout>
        <Slider />
        <Categories />
        <MoviesGrid />
      </Layout>
    </MovieAPIContext.Provider>
  )
}
