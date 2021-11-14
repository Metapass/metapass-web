import axios from 'axios'
import { create, urlSource } from 'ipfs-http-client'

const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
})

const useTicket = async (title, ticketNumber, url) => {
    const res = await axios.get(
        `https://radiant-caverns-43873.herokuapp.com/edit/url=${url}&hero_text=${title}&ticket_no=${ticketNumber}&venue=Metaverse&date=Dec%202021`
    )

    // @ts-ignore
    let { cid } = await ipfs.add(urlSource(res.data[0]))
    return `https://ipfs.io/ipfs/${cid.toString()}`
}

export { useTicket }
