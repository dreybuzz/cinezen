import { useContext, useState } from "react"
import { MovieAPIContext } from "../../contexts/MovieAPIContext"
import Cart from "../Cart/Cart"
import CustomSelect from "../CustomSelect/CustomSelect"
import "/node_modules/flag-icons/css/flag-icons.min.css"

export default function Navbar() {
  const { cart } = useContext(MovieAPIContext)
  const [showCart, setShowCart] = useState(false)
  return (
    <div className="flex font-quicksand bg-white p-2 flex-wrap justify-between ">
      {/* Language Select & Search Bar*/}
      <div className="flex-1 px-2 hidden md:flex items-center">
        {/* Language Select */}
        <div className="hidden lg:flex">
          <CustomSelect
            selectedOptionIndex={0}
            options={[
              {
                id: 0,
                value: "en",
                title: "EN",
                icon: <span className="fi fi-us"></span>,
              },
              {
                id: 1,
                value: "fr",
                title: "FR",
                icon: <span className="fi fi-fr"></span>,
              },
              {
                id: 2,
                value: "de",
                title: "DE",
                icon: <span className="fi fi-de"></span>,
              },
              {
                id: 3,
                value: "es",
                title: "ES",
                icon: <span className="fi fi-es"></span>,
              },
            ]}
          />
        </div>

        {/* Search Bar */}
        <div className="lg:ml-12 flex justify-between items-center border border-gray-200 gap-2 p-2">
          <input
            type="text"
            placeholder="Search"
            className="outline-none border-0"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>

      {/* Logo */}
      <div className="flex-1 flex md:justify-center items-center font-sen">
        <span className="font-bold text-2xl sm:text-4xl">
          <span className="text-red-600">Cine</span>
          <span className="text-emerald-700">Zen</span>
        </span>
      </div>

      {/* Account & Cart */}
      <div className="hidden flex-1 md:flex items-center justify-end px-2 gap-4 lg:gap-6 cursor-pointer">
        {/* Register / Sign in */}
        <span className="flex items-center justify-center uppercase text-sm lg:text-base border border-gray-500 p-2 font-semibold hover:bg-black hover:text-white">
          <i className="fa-solid fa-user mr-1"></i> Register / Sign In
        </span>

        {/* Cart */}
        <div
          className="p-3 cursor-pointer hover:text-red-500 ease-linear duration-200 relative"
          onClick={() => {
            setShowCart(!showCart)
          }}
          onMouseLeave={() => {
            // setShowCart(false)
          }}
          onMouseOver={() => {
            setShowCart(true)
          }}>
          <i className="fa-solid fa-cart-shopping lg:text-xl z-10"></i>
          {cart.length > 0 && (
            <span className="absolute text-sm text-white bg-black w-6 h-6 rounded-full justify-center items-center flex top-[5px] right-0">
              {cart.length}
            </span>
          )}

          {/* Cart Items */}
          <div
            className={`duration-200 overflow-hidden transition-all absolute ${
              showCart
                ? "z-20 min-h-[48rem] max-h-48 bg-slate-600 p-2 min-w-[24rem] text-white rounded-lg w-fit whitespace-nowrap flex flex-nowrap top-12 right-2 overflow-scroll"
                : "w-0 overflow-hidden h-0 top-20 right-10"
            }`}
            onClick={(e) => {
              e.stopPropagation()
            }}>
            <Cart />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center cursor-pointer">
        <i className="fa-solid fa-bars"></i>
      </div>
    </div>
  )
}
