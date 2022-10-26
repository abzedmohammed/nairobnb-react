import { Link } from "react-router-dom";

export default function Houses({name, price, address, id, image, type}){
    
    return (
        <>

          <div class="card">
            <div class="card__img">
                <img src={image} alt="room-imgs" />
            </div>
            <div class="card__details">
              <h3 for="cozyroom">{name}</h3>
              <div class="address">{address}</div>
              <div class="address">{type}</div>
                <div class="price__l">
                  <span class="price__label">KES. {price} /</span>
                  <span class="measure__label">night</span>
                </div>
              <Link to={"/rooms/" + id} style={{width: "150px"}} className="details-btn">Details</Link>
            </div>
          </div>     
        </>
    )
}