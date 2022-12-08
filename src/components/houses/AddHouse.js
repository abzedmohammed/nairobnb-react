import { useState } from "react"
import {useNavigate} from 'react-router-dom';

export default function AddHouse({handleNewRoom, user}){
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    bnb_type: "",
    price: 0,
    bnb_image: "",
    features: "",
    bed: 0,
    size: 0,
    wifi: false,
    electronics: false,
    booked: false,
    bnb_user_id: user.id,
})

function handleInput(e){
  const name = e.target.name
  let value = e.target.value

  setFormData({...formData, 
  [name]: value
  })

}

function handleSubmit(e){
  e.preventDefault()
  handleNewRoom(formData)
  navigate("/rooms")
 
 }
    return(
        <div className="postForm">
            <h2>Add Property</h2>
            <form  onSubmit={(e) => {handleSubmit(e)}} >
              <div className="input-group">
              <div>
                <label className="mx-2" htmlFor="name">Property Name</label>
                <input required type="text" placeholder="eg. Paradise hotel"
                value={formData.name} onChange={handleInput} name="name"/>
              </div>

              <div>
                <label className="mx-2" htmlFor="address">Property Address</label>
                <input required type="text" placeholder="Address eg. 123 Paraise Street"
                value={formData.address} onChange={handleInput} name="address"/>
                </div>
              </div>

              <br />

              <div className="input-group">
                <div>
                    <label className="mx-2" htmlFor="bnb_image">Property Image</label>
                    <input required type="text" value={formData.bnb_image} onChange={handleInput} placeholder="http://placehouse.com/g/2000/600" name="bnb_image" />
                </div>

                <div>
                    <label className="mx-2" htmlFor="price">Price in KES</label>
                    <input required type="number" value={formData.price} onChange={handleInput} placeholder="KES 5000" name="price" />
                </div>
              </div>

              <br />

              <div className="input-group">
                
              </div>
              <div className="input-text">
                <div>
                    <label className="mx-2" htmlFor="name">Description and features</label>
                    <textarea placeholder="Decribe your property" value={formData.features} name="features" 
                    onChange={handleInput} rows="3" cols="21"></textarea>
                </div>
              </div>

              <br />

              <div className="input-group">
                <div>
                        <label className="mx-2" htmlFor="bnb_type">Room type</label>
                        <select value={formData.bnb_type} name="bnb_type" 
                        onChange={handleInput} required>
                            <option value="Bedsitter">Bedsitter</option>
                            <option value="1 Bedroom">1 Bedroom</option>
                            <option value="2 Bedroom">2 Bedroom</option>
                            <option value="3 Bedroom">3 Bedroom</option>
                            <option value="4 Bedroom">4 Bedroom</option>
                            <option value="Single Room">Single Room</option>
                        </select>
                    </div>

                <input required type="number" placeholder="Property size in Sq.Ft."
                value={formData.size} onChange={handleInput} name="size"/>

                <input required type="number" placeholder="Beds available"
                value={formData.bed} onChange={handleInput} name="bed"/>
              </div>

              <br />

              <div style={{display: "flex", justifyContent: "center"}} className="">
                <div>
                    <label className="mx-2" htmlFor="electronics">Electronics</label>
                    <input type="checkbox" name="electronics" 
                    value={formData.electronics} onChange={handleInput} />
                </div>

                <div>
                <label className="mx-2" htmlFor="wifi">Wi-Fi</label>
                    <input type="checkbox" name="wifi" 
                    value={formData.wifi} onChange={handleInput} />
                </div>
              </div>

              <br />

              <div className="input-group">
                <input required type="submit" value="Submit" />
              </div>
            </form>
          </div>
    )
}