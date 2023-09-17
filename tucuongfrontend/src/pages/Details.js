import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Details = () => {
    const {id} = useParams()

    const [fruit, setFruit] = useState(null)


    useEffect(() => {
       axios.get(`https://localhost:7036/api/Plants/${id}`)
       .then(response => setFruit(response.data))
       .catch(error => console.log(error))


    }, [])
    return <h1> {JSON.stringify(fruit)} </h1>
}
