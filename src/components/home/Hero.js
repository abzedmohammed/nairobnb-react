import { Link, useParams } from "react-router-dom";

export default function Hero(){
    const {id} = useParams()

    return(
        <>
        <div className="itemDisplayWrapper">
            <div style={{
                background: "url('https://cdn.shopify.com/s/files/1/1740/0017/articles/how-to-create-a-luxury-master-bedroom-on-a-budget-1_1024x.jpg?v=1611742512')",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%"
            }} className="itemDisplayImg">     
        </div>
    
        <div className="itemDisplayDetailLines">
            <div className="itemDisplayPropName">
                Ngong Hills Hotel
            </div>
            <div className="mt-3">
            <i className="fa fa-object-ungroup" aria-hidden="true"></i> 1450 Sq.Ft.
            </div>
            <div className="mt-2">
            <i className="fa fa-bed" aria-hidden="true"></i> x3  &nbsp; &nbsp; &nbsp;
            <i className="fa fa-bath" aria-hidden="true"></i> x4 
            </div>

            <div className="mt-2"><i className="fa fa-map-marker" aria-hidden="true"></i>  Ngong Road, Nairobi</div>
            <div className="mt-2"><i className="fa fa-money" aria-hidden="true"></i> KES. 5,000</div>
            <div className="mt-2"><i className="fa fa-building-o" aria-hidden="true"></i> by Hot'ale Managements</div>
            <div className="">
            <Link
             type="button" 
             to="/rooms"
             className="exploreBtn text-center mt-4">Explore Rooms</Link> 
            </div>
        </div>
        </div>
 
        </>
    )
}