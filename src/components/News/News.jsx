export default function News({ news }) {
  return (
    <div className="text-white rounded-lg shadow-xl h-96 w-64 border border-gray-500 hover:scale-105 cursor-pointer ease-linear duration-500 flex flex-col justify-between items-center overflow-hidden">
      <img
        src={
          news.image_url ||
          `https://picsum.photos/300?random=${Math.ceil(Math.random() * 999)}`
        }
        alt=""
        className="w-full h-48 max-h-48 object-cover hover:scale-105 ease-linear duration-300 overflow-scroll bg-red-500"
      />
      <span className="p-3 h-48">{news.title}</span>
      <div className="h-fit w-14 rounded-full flex justify-center items-center bg-red-500 mb-5 p-3 hover:scale-105 ease-linear duration-200 hover:shadow-inner hover:bg-teal-500 hover:text-black">
        <i className="fa-solid fa-arrow-up-right-from-square lg:text-2xl"></i>
      </div>
    </div>
  )
}
