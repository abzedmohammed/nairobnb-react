import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function Order(){
    const [singleRoom, setSingleRoom] = useState({})
    const [booked, setbooked] = useState(false)
    const [total, setTotal] = useState(0)
    const [night, setNight] = useState(0)
    const {id} = useParams()
    useEffect(() => {
        fetch(`https://nairobnb-api.onrender.com/bnb_rooms/${id}`)
        .then(res => res.json())
        .then(data => setSingleRoom(data))
    }, [])

    useEffect(() => {
        setTotal(singleRoom.price * night)
    }, [night])
    
    function handleOrder(e){
        e.preventDefault()
        singleRoom.booked = true
        delete singleRoom.id
        console.log('====================================');
        console.log(singleRoom);
        console.log('====================================');

        fetch(`https://nairobnb-api.onrender.com/bnb_rooms/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...singleRoom
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setbooked(true)
        })
    }

    if (booked) {
        return <Navigate to="/rooms" />
    }
    return(
        <>
        <div className="checkout-container">
        <div style={{
            backgroundImage: `url(${singleRoom.bnb_image})`
        }} className="left-side">
            <div className="text-box">
            <h1 className="home-heading">{singleRoom.name}</h1>
            <p className="home-price"><em>KES. {singleRoom.price} </em>/ 1 night</p>
            <hr className="left-hr" />
            <p className="home-desc"><em>Entire home </em>for <em>{singleRoom.bed} guest</em></p>
            </div>
        </div>

        <div className="right-side">
            <div className="receipt">
            <h2 className="receipt-heading">Receipt Summary</h2>
            <div>
                <table className="table">
                <tr>
                    <td>KES. {singleRoom.price} x <input className="per-night" type="number" 
                    onChange={e => setNight(e.target.value)} value={night} /> nights</td>
                    <td className="price">KES. {total ? total : 0}</td>
                </tr>
                <tr>
                    <td>Discount</td>
                    <td className="price">KES. 0.00</td>
                </tr>
                <tr>
                    <td>Subtotal</td>
                    <td className="price">KES. {total ? total : 0}</td>
                </tr>
                <tr>
                    <td>Tax</td>
                    <td className="price">KES. 00.00</td>
                </tr>
                <tr className="total">
                    <td>Total</td>
                    <td className="price">KES. {total}</td>
                </tr>
                </table>
            </div>
            </div>

            <div className="payment-info">
            <form onSubmit={handleOrder}
                className="form-box"
                enctype="text/plain"
                method="get"
                target="_blank"
            >
                
                <button type="submit" className="btn">
                <i className="fa-solid fa-lock"></i> Book
                </button>
            </form>

            </div>
        </div>
        </div>
        </>
    )
}