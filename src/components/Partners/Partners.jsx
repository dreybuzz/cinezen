import React from "react"

export default function Partners({}) {
  const partners = [
    {
      name: "HBO Max",
      website: "https://hbomax.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/HBO_Max_Logo.svg/1596px-HBO_Max_Logo.svg.png?20210613093638",
    },

    {
      name: "YouTube",
      website: "https://youtube.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1024px-YouTube_Logo_2017.svg.png?20220605194644",
    },

    // {
    //   name: "Hulu",
    //   website: "https://hulu.com",
    //   logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Hulu_logo_%282014%29.svg/1600px-Hulu_logo_%282014%29.svg.png?20201016084050",
    // },

    {
      name: "Netflix",
      website: "https://netflix.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png?20190206123158",
    },

    {
      name: "Showmax",
      website: "https://showmax.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Showmax_logo.png?20170909123224",
    },

    {
      name: "DSTV",
      website: "https://dstv.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/DStv_2012_logo.svg/640px-DStv_2012_logo.svg.png",
    },

    // {
    //   name: "Disney+",
    //   website: "https://disneyplus.com",
    //   logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/1024px-Disney%2B_logo.svg.png?20220129033317",
    // },
  ]
  return (
    <div className="container mx-auto flex flex-wrap gap-5 lg:gap-10 2xl:gap-20 justify-center items-center">
      {partners.map((partner, index) => {
        return (
          <div
            key={index}
            className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:flex-1 h-24 overflow-hidden">
            <img
              src={partner.logo}
              alt=""
              className="h-full object-scale-down"
            />
          </div>
        )
      })}
    </div>
  )
}
