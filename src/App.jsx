import Slider from "./components/Slider/Slider"
import Layout from "./Layout"
import { MovieAPIContext } from "./contexts/MovieAPIContext"
import { useEffect, useState } from "react"
import axios from "axios"
import Categories from "./components/Categories/Categories"
import MoviesGrid from "./components/MoviesGrid/MoviesGrid"
import NewsSlide from "./components/NewsSlide/NewsSlide"
import Partners from "./components/Partners/Partners"
import { sortCartByCinema, sortCartByMovie } from "./constants/helperFunctions"

const MOVIES_API_KEY = "9e1f73b46b9839eb16cdad61cd9511c8"
const NEWS_API_KEY = "pub_10805266a41af8a7b2f48a644804fc6c72775"

export default function App() {
  async function getMovies(url, query, optionalParamData = null) {
    const BASE_URL = `https://api.themoviedb.org/3/`
    try {
      const apiRequest = await axios.get(
        `${BASE_URL + url}?api_key=${MOVIES_API_KEY}&query=${query}${
          optionalParamData || ""
        }`
      )
      return apiRequest.data
    } catch (err) {
      return "Error Fetching Movies - " + err
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

  // News
  const [newsCache] = useState(localStorage.getItem("news-cache") || null)
  const [news, setNews] = useState(newsCache ? JSON.parse(newsCache) : [])
  async function getNews() {
    const URL = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=movies`
    try {
      const apiRequest = await axios.get(`${URL}`)
      setNews(() => apiRequest.data.results)
    } catch (err) {
      return "Error Fetching News - " + err
    }
  }

  useEffect(() => {
    getNowPlayingLocal()
    getNowPlayingIntl()
    getUpcoming()
    // getNews()
  }, [])

  const [cart, setCart] = useState([])
  const [cartByMovie, setCartByMovie] = useState(sortCartByMovie(cart))
  const [cartByCinema, setCartByCinema] = useState(sortCartByCinema(cart))
  function updateCart(action, item) {
    if (action === "add") {
      setCart((cart) => [...cart, item])
    } else if (action === "delete") {
      // console.log(item)
      setCart(() => cart.filter((cart) => cart.id !== item.id))
    } else if (action === "update") {
      setCart(() =>
        cart.map((cartItem) => {
          if (item.id === cartItem.id) {
            return item
          } else {
            return cartItem
          }
        })
      )
    }
  }

  useEffect(() => {
    setCartByMovie(sortCartByMovie(cart))
    setCartByCinema(sortCartByCinema(cart))
    console.log(sortCartByCinema(cart))
  }, [cart])

  return (
    <MovieAPIContext.Provider
      value={{
        nowPlayingLocal,
        nowPlayingIntl,
        upcoming,
        news,
        cart,
        cartByMovie,
        cartByCinema,
        updateCart,
      }}>
      <Layout>
        <Slider />
        <Categories />
        <MoviesGrid />
        <NewsSlide />
        <Partners />
      </Layout>
    </MovieAPIContext.Provider>
  )
}
