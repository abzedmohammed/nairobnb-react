import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Order(){
    const [singleRoom, setSingleRoom] = useState({})
    const [total, setTotal] = useState(singleRoom.price)
    const [night, setNight] = useState(1)
    const {id} = useParams()
    console.log(singleRoom.price);
    console.log(total);
    useEffect(() => {
        fetch(`http://localhost:9292/bnbs/${id}`)
        .then(res => res.json())
        .then(data => setSingleRoom(data))
    }, [])

    function handlePayment(e){
        setNight(e.target.value)
        const amount = singleRoom.price * night
        console.log(amount);
        setTotal(amount)
    }

    function handleOrder(e){
        e.preventDefault()
        fetch(`http://localhost:9292/bnbs/${id}`, {

        })
        .then(res => res.json)
    }

    return(
        <>
        <div className="checkout-container">
        <div className="left-side">
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
                    <td>{singleRoom.price} x <input className="per-night" type="number" 
                    onChange={(e) => handlePayment(e)} value={night} /> nights</td>
                    <td className="price">KES. {total}</td>
                </tr>
                <tr>
                    <td>Discount</td>
                    <td className="price">KES. 0.00</td>
                </tr>
                <tr>
                    <td>Subtotal</td>
                    <td className="price">KES. {total}</td>
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