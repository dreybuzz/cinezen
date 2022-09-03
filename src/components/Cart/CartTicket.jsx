import { useContext, useState } from "react"
import { MovieAPIContext } from "../../contexts/MovieAPIContext"
import CartItem from "./CartItem"
import TicketOptions from "./TicketOptions"

export default function CartTicket({
  item,
  ticketOptionsShown = false,
  misc = "",
  itemRightIconFunc = null,
}) {
  //   console.log(itemRightIconFunc)
  const { updateCart, cinemas } = useContext(MovieAPIContext)
  const [showTicketOptions, setShowTicketOptions] = useState(ticketOptionsShown)
  return (
    <div className="flex flex-col p-2">
      <CartItem
        leftIcon={<i className="fa-solid fa-ticket"></i>}
        itemTitle={item.title}
        rightIcon={<i className="fa-solid fa-xmark"></i>}
        rightIconFunc={() => itemRightIconFunc() || updateCart("delete", item)}
        optionsShown={showTicketOptions}
        toggleOptionsShownFunc={() =>
          setShowTicketOptions(() => !showTicketOptions)
        }
        bgColor={misc}
      />
      {/* Ticket Options */}
      <TicketOptions ticket={item} shown={showTicketOptions} />
    </div>
  )
}
