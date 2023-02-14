import { useDispatch, useSelector } from 'react-redux';
import Houses from './Houses';
import { useEffect } from 'react';
import { fetchBnbs } from '../../features/bnbs/bnbSlice';

export default function HousesList() {
	const rooms = useSelector((state) => state.bnbs);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchBnbs());
	}, []);
	return (
		<>
			<div className='container'>
				<h3 className='bnb-services text-black my-4'>
					<span className='bnb-head'>Explore</span> Rooms
				</h3>
				{rooms.loading && 
                    <div className='loading'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: "auto", background: "none", display: "block", shapeRendering: "auto", animationPlayState: "running", animationDelay: "0s"}} width="55px" height="55px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" fill="none" stroke="#3b88fc" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138" style={{animationPlayState: "running", animationDelay: "0s"}}>
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" style={{animationPlayState: "running", animationDelay: "0s"}}></animateTransform>
                            </circle>
                            </svg> 
                        </div>
                        Loading properties...
                    </div>}
                {!rooms.loading && rooms.error ? <div>Error: {rooms.error}</div> : null}
                {!rooms.loading && rooms.bnbs.length ? (
                    <div className='cards'>
					{rooms.bnbs.map((room) => {
						return (
							<Houses
								key={room.id}
								address={room.address}
								name={room.name}
								price={room.price}
								id={room.id}
								image={room.bnb_image}
								type={room.bnb_type}
							/>
						);
					})}
				</div>
                ) : null}
			</div>
		</>
	);
}
