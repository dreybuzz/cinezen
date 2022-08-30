import CustomSelect from "../CustomSelect/CustomSelect"
import "/node_modules/flag-icons/css/flag-icons.min.css"

export default function Navbar() {
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
        <span className="flex items-center justify-center uppercase text-sm lg:text-base border border-gray-500 p-2 font-semibold ease-linear duration-200 hover:scale-105 hover:bg-black hover:text-white">
          <i className="fa-solid fa-user mr-1"></i> Register / Sign In
        </span>
        <i className="fa-solid fa-cart-shopping lg:text-xl"></i>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center cursor-pointer">
        <i className="fa-solid fa-bars"></i>
      </div>
    </div>
  )
}
