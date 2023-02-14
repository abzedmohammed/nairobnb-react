import { Link } from "react-router-dom";

export default function Houses({name, price, address, id, image, type}){
    
    return (
			<>
				<div className='card'>
					<div className='card__img'>
						<img src={image} alt='room-imgs' />
					</div>
					<div className='card__details'>
						<h3 htmlFor='cozyroom'>{name}</h3>
						<div className='address'>{address}</div>
						<div className='address'>{type}</div>
						<div className='price__l'>
							<span className='price__label'>KES. {price} /</span>
							<span className='measure__label'>night</span>
						</div>
						<Link
							to={'/rooms/' + id}
							style={{ width: '150px' }}
							className='details-btn'
						>
							Details
						</Link>
					</div>
				</div>
			</>
		);
}