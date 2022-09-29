import axios from 'axios'
import date from 'date-and-time'
axios.defaults.baseURL = "https://api.scryfall.com"

export function searchCardByName(cardName: string) {
    return axios.get('/cards/named', {
        params: {
            fuzzy: cardName
        }
    })
}

export function searchCardByCode(setCode: string, setNumber: string) {
    return axios.get(`/cards/${setCode}/${setNumber}`)
}

export function getOldestVersion(exactCardName: string) {
    return axios.get('/cards/search', {
        params: {
            q: `!"${exactCardName}" prefer:oldest`
        }
    })
}

export function getMtgSet(setCode: string) {
    return axios.get(`/sets/${setCode}`)
}

export function parseDate(dateString: string) {
    return date.parse(dateString, 'YYYY-MM-DD')
}

export function calculateAge(releaseDate: string) {
    return date.subtract(new Date(), date.parse(releaseDate, 'YYYY-MM-DD')).toDays()
}

// Given a string of decklist, return an array of promise for each card search
export function processDecklist(decklist: string) {
    var cardArray = decklist.split("\n")
    var promiseList = [] as Promise<any>[]
    cardArray.forEach(card => {
        var splitCard = card.split(" ")
        var amount = splitCard[0]
        // Check if card has set code and set number
        try {
            if (card.includes('(')) {
                var setNumber = splitCard[splitCard.length-1]
                var setCode = splitCard[splitCard.length-2]
                setCode = setCode.slice(1, setCode.length-1)
                var cardName = splitCard.slice(1, splitCard.length-2).join(" ")
                promiseList.push(searchCardByCode(setCode, setNumber))
            }
            else {
                var cardName = splitCard.slice(1).join(" ")
                promiseList.push(searchCardByName(cardName))
            }
        }
        catch (err) {
            console.log(err)
            return null
        }
    });
    return promiseList
}

export function isBasicLand(exactCardName: string) {
    var basicLandNames = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest', 'Wastes']
    return basicLandNames.includes(exactCardName)
}
