import { useState, useRef } from "react"

export default function CustomSelect({
  title = null,
  selectedOptionIndex = 0,
  handleOptionChange = () => {},
  options = [],
}) {
  const dropDownSwitch = useRef()
  const optionsList = useRef()
  const optionsLength = "h-" + options.length * 10
  const [dropped, setDropped] = useState(false)
  const [selectedOption, setSelectedOption] = useState(selectedOptionIndex)

  const SelectOption = ({ option = {} }) => {
    return (
      <span
        key={option?.id}
        className="flex items-center cursor-pointer w-fit mb-2 "
        onClick={() => {
          setSelectedOption(option?.id)
        }}>
        <span className="mr-2">{option?.icon}</span>
        <span className="outline-none cursor-pointer ">{option?.title}</span>
      </span>
    )
  }

  return (
    <span className="flex flex-col">
      {/* Title Container */}
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => {
          setDropped(() => !dropped)
        }}>
        {/* Option */}
        <span className=" pt-2 flex justify-center items-center">
          <SelectOption option={options[selectedOption]} />
        </span>

        {/* Caret */}
        <span className="">
          <i ref={dropDownSwitch} className={`fa-solid fa-caret-down`}></i>
        </span>
      </div>

      {/* Options Container */}
      <ul
        ref={optionsList}
        className={`h-0 overflow-hidden ${
          dropped && optionsLength
        } ease-linear duration-300`}>
        {options
          .filter((option) => option.id !== selectedOption)
          .map((option, index) => {
            return <SelectOption key={option.id} option={option} />
          })}
      </ul>
    </span>
  )
}
