import { Link, useParams } from "react-router-dom";

export default function Single({price, address, image, name, posted, features, bed, wifi, user, size, booked, electronics, type}){
    const {id} = useParams()

    let time
    const days = Math.ceil((new Date().getTime() - new Date(posted).getTime()) / 86400000)

    if (days >= 2) {
        time = "days"
    } else {
        time = "day"
    }

    return (
			<>
				<div className='itemDisplayWrapper'>
					<div
						style={{
							backgroundImage: 'url(' + image + ')',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							backgroundSize: '100% 100%',
						}}
						className='itemDisplayImg'
					>
						<div className='itemDisplayHeart'></div>
					</div>

					<div className='itemDisplayDetailLines'>
						<div className='itemDisplayPropName'>
							<center>{name}</center>
						</div>

						<span className='description'>
							<small>{features}</small>
						</span>
						<div className=''>
							<i className='fas fa-calendar-day icon'></i> Posted {days} {time}{' '}
							ago
						</div>
						<div className=''>
							<i className='fa fa-object-ungroup icon' aria-hidden='true'></i>{' '}
							{size} Sq.Ft.
						</div>

						<div className=''>
							<i className='fa fa-bed icon' aria-hidden='true'>
								{' '}
								<span className='icon-text'>x{bed}</span>
							</i>
							<i className='fa fa-bath icon' aria-hidden='true'>
								{' '}
								<span className='icon-text'>x{bed}</span>
							</i>
							{wifi ? <i className='fas fa-wifi icon'></i> : false}
							{electronics ? (
								<>
									<i className='fas fa-microchip icon'></i>
									<i className='fas fa-tv icon'></i>
								</>
							) : (
								false
							)}
						</div>

						<div className=''>
							<i className='fa fa-map-marker' aria-hidden='true'></i> {address}
						</div>
						<div className=''>
							<i className='fa fa-money' aria-hidden='true'></i> {type}
						</div>
						<div className=''>
							<i className='fa fa-money' aria-hidden='true'></i> KES. {price}
						</div>
						<div className=''>
							<i className='fa fa-building-o' aria-hidden='true'></i> by {user}
						</div>
						<div className='my-3'>
							<Link type='button'	to={`/rooms/${id}/order`} className='exploreBtn text-center'>Order</Link>
						</div>
					</div>
				</div>
			</>
		);
}