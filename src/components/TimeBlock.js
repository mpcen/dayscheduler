import React from 'react';
import moment from 'moment';
import '../styles/TimeBlock.css';


const TimeBlock = ({timeBlock}) => {
	let timeBlockClass = timeBlock.events.length ? 'TimeBlock-li booked' : 'TimeBlock-li open';
	
	return (
		<li className={timeBlockClass}>
			{moment(timeBlock.time).format('HH:mm').toString()}
		</li>
	);
}

export default TimeBlock;