import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Single from "./Single";
import { fetchBnbById} from "../../features/bnbs/bnbSlice"
import { useDispatch, useSelector } from 'react-redux';


export default function SingleHouse(){
    const {id} = useParams()
    const singleRoom = useSelector(state => state.bnbs.singleBnb)
    console.log(singleRoom);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBnbById(id))
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