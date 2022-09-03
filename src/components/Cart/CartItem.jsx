export default function CartItem({
  leftIcon,
  itemTitle,
  rightIcon,
  rightIconFunc,
  toggleOptionsShownFunc,
  bgColor = null,
}) {
  return (
    <>
      {/* Items Details */}
      <div
        className={`shadow-xl rounded-xl p-3 ease-linear transition-all duration-150 hover:scale-105 flex flex-1 justify-between items-center gap-3 ${
          bgColor || "bg-slate-900"
        }`}
        onClick={toggleOptionsShownFunc}>
        {/* Left Icon & Title */}
        <div className="flex items-center gap-2">
          {/* Left Icon */}
          <div>{leftIcon}</div>

          {/* Title */}
          <div>{itemTitle}</div>
        </div>

        {/* Right Icon */}
        <div className="text-red-500 font-extrabold" onClick={rightIconFunc}>
          {rightIcon}
        </div>
      </div>
    </>
  )
}
