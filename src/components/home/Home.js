import Hero from "./Hero";

export default function Home(){
    return(
        <>
        
            <div className="main-home-container">
                    <Hero />
            </div> 
            <br />
            <br />

            <div className="container">
            <h3 className="bnb-services"><span className="bnb-head">NairoBNB</span> Services</h3>
            <div className="main-home mt-4">
            <div class="cards-grid">
                <div class="card">
                    <img class="card__icon" src="https://img.freepik.com/free-vector/modern-house-template_575670-12.jpg?w=2000" alt="ux-design" />
                    <div class="card__body">
                        <h4 class="card__head">Modern Homes</h4>
                        <p class="card__content">Our homes are designed with you in mind to make you feel at home.</p>
                    </div>
                </div>
                <div class="card">
                    <img class="card__icon" src="https://cdn.dribbble.com/users/1787323/screenshots/7477950/media/a31d9c0a3d44336526059a33bd20224d.png?compress=1&resize=400x300" alt="development" />
                    <div class="card__body">
                        <h4 class="card__head">Snacks & Drinks</h4>
                        <p class="card__content">Pay once and get 3 meals a day and snacks in between meals.</p>
                    </div>
                </div>
                <div class="card">
                    <img class="card__icon" src="https://img.freepik.com/premium-vector/home-appliances-set-domestic-electronics-machines-outline-concept-equipment-elements-kitchen-cooking-vacuum-cleaning-laundry-washing-vector-illustration-isolated-daily-indoor-gadgets_1995-708.jpg?w=2000" alt="brand" />
                    <div class="card__body">
                        <h4 class="card__head">Home Gadgets</h4>
                        <p class="card__content">Our homes have all the gadgets you need for a fulfilling experience.</p>
                    </div>
                            </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
        </>
    )
}