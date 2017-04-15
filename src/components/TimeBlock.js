import React from 'react';
import moment from 'moment';
import '../styles/TimeBlock.css';


const TimeBlock = ({timeBlock}) => {
	let minute = `minute-${moment(timeBlock.time).format('mm').toString()}`;
	let timeBlockClass = `TimeBlock ${minute}`;

	function renderTimeBlock(timeBlock) {
		if(timeBlock.events.length)			
			return timeBlock.events.map((event, index) => {
				if(!event.title && !event.start && event.end)
					return <div key={index} className="event empty-event"></div>

				if(moment(timeBlock.time).format('HH:mm').toString() === event.start) {
					return (
						<div key={index} className="event event-start event-content">
							<span>{event.title}</span>
						</div>
					);
				} else {
					return (
						<div key={index} className="event event-content"></div>
					);
				}
			});
	}
	
	return (
		<li className={timeBlockClass}>
			<div className="time-container">
				<span>
					{moment(timeBlock.time).format('HH:mm').toString()}
				</span>
			</div>

			<div className="event-list">
				{renderTimeBlock(timeBlock)}
			</div>
		</li>
	);
}

export default TimeBlock;