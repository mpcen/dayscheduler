import React from 'react';
import moment from 'moment';
import '../styles/TimeBlock.css';


const TimeBlock = ({timeBlock}) => {
	let minute = `minute-${moment(timeBlock.time).format('mm').toString()}`;
	let timeBlockClass = `TimeBlock ${minute}`;

	function renderEvents(timeBlock) {		
		if(timeBlock.events.length) {
			return timeBlock.events.map((event, index) => {
				return (
					<div key={index} className="event-content">
						<span>{event.title}</span>
					</div>
				);
			});
		}
	}
	
	return (
		<li className={timeBlockClass}>
			<div className="time-container">
				<span>
					{moment(timeBlock.time).format('HH:mm').toString()}
				</span>
			</div>

			<div className="event-list">
				{renderEvents(timeBlock)}
			</div>
		</li>
	);
}

export default TimeBlock;