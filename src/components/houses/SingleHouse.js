import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Single from "./Single";

export default function SingleHouse(){
    const [singleRoom, setSingleRoom] = useState({})
    const {id} = useParams()
    useEffect(() => {
        fetch(`https://nairobnb-api.onrender.com/bnb_rooms/${id}`)
        .then(res => res.json())
        .then(data => setSingleRoom(data))
    }, [])
    
    return(
        <>
            <Single address={singleRoom.address} image={singleRoom.bnb_image} type={singleRoom.bnb_type} 
            name={singleRoom.name} price={singleRoom.price} posted={singleRoom.created_at} features={singleRoom.features} 
            bed={singleRoom.bed} size={singleRoom.size} wifi={singleRoom.wifi} electronics={singleRoom.electronics} 
            booked={singleRoom.booked} user={singleRoom.bnb_user_id} />
        </>
    )
}