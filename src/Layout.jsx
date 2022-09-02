import Announcement from "./components/Announcement/Announcement"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"

export default function Layout({ children }) {
  return (
    <div className="bg-gray-200 h-screen relative overflow-scroll">
      <div className="sticky w-full top-0 z-20">
        <Announcement />
        <Navbar />
      </div>
      {children}
      <Footer />
    </div>
  )
}
