import { useContext } from "react"
import { MovieAPIContext } from "../../contexts/MovieAPIContext"
import News from "../News/News"

export default function NewsSlide() {
  const { news } = useContext(MovieAPIContext)
  return (
    <div className="bg-black p-5 mb-24 flex overflow-scroll snap-x">
      {news.map((news, index) => {
        return (
          <div key={index} className="inline-flex mx-5 snap-center">
            <News news={news} />
          </div>
        )
      })}
    </div>
  )
}
