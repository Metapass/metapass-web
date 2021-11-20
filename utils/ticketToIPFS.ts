import axios from 'axios'
import { create, urlSource } from 'ipfs-http-client'
import moment from 'moment'

const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
})

const monthArray = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
]

const ticketToIPFS = async (title, ticketNumber, url, date) => {
    let parsedDate = moment(date)
    const res = await axios.get(
        `https://radiant-caverns-43873.herokuapp.com/edit/url=${url}&hero_text=${title}&ticket_no=#${ticketNumber}&venue=Metaverse&date=${
            monthArray[parsedDate.month()] + `%20` + parsedDate.year()
        }`
    )

    // @ts-ignore
    let { cid } = await ipfs.add(urlSource(res.data[0]))
    return `https://ipfs.io/ipfs/${cid.toString()}`
}

export { ticketToIPFS }
