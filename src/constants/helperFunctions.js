import { cinemas } from "./cinemas"

export const BASE_MOVIE_IMAGES_URL = "https://image.tmdb.org/t/p/original/"

export function getParsedDate() {
    let date = new Date("2013-08-03T02:00:00Z")
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let dt = date.getDate()

    if (dt < 10) {
        dt = "0" + dt
    }
    if (month < 10) {
        month = "0" + month
    }

    return year + "-" + month + "-" + dt
}

export function sortCartByMovie(cart) {
    const output = []
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i]
        let itemIndex = searchInArr("movie", item.movie, output)
        if (itemIndex > -1) {
            output[itemIndex].tickets.push(item)
        } else {
            output.push({
                movie: item.movie,
                title: item.title,
                tickets: [item],
            })
        }
    }
    return output
}

// TODO: Refactor Sort Functions Into One Function... Feeling Way Too Lazy...
export function sortCartByCinema(cart) {
    const output = []
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i]
        let itemIndex = searchInArr("cinema", item.cinema, output)
        if (itemIndex > -1) {
            output[itemIndex].tickets.push(item)
        } else {
            output.push({
                cinema: item.cinema,
                title: item.cinemaIndex ? cinemas[item.cinemaIndex].title : null,
                tickets: [item],
            })
        }
    }
    return output
}

function searchInArr(key, value, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (value === arr[i][key]) return i
    }
    return -1
}