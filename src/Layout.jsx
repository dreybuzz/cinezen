import Announcement from "./components/Announcement/Announcement"
import Footer from "./components/Footer/Footer"
import BuyNowOverlayModal from "./components/BuyNowOverlayModal/BuyNowOverlayModal"
import Navbar from "./components/Navbar/Navbar"
import { useContext, useState } from "react"
import { MovieAPIContext } from "./contexts/MovieAPIContext"

export default function Layout({ children }) {
  const { buyNowModalOverlayShown, setBuyNowOverlayModalShown } =
    useContext(MovieAPIContext)

  return (
    <div className="bg-gray-200 h-screen relative overflow-scroll">
      <BuyNowOverlayModal
        shown={buyNowModalOverlayShown}
        toggleVisibilityFunc={setBuyNowOverlayModalShown}
      />
      <div className="sticky w-full top-0 z-20">
        <Announcement />
        <Navbar />
      </div>
      {children}
      <Footer />
    </div>
  )
}
