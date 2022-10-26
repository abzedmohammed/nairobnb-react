import Footer from "../nav/Footer";
import Houses from "./Houses";

export default function HousesList({rooms}){
    
    return (
        <>
        <div class="container">
        <h3 className="bnb-services text-black my-4"><span className="bnb-head">Explore</span> Rooms</h3>
        <div class="cards">
            {
                rooms.map(room => {
                    return <Houses key={room.id} address={room.address} name={room.name} price={room.price} 
                    id={room.id} image={room.bnb_image} type={room.bnb_type} />
                })
            }
        </div>
      </div>
      <Footer />
        </>
    )
}