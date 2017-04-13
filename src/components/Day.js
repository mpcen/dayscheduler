import React from 'react';
import DateHeader from './DateHeader';
import Schedule from './Schedule';

const Day = (props) => {
	return (
		<div>
			<DateHeader date={props.eventData.date} />
			<Schedule
				prescheduledEvents={props.eventData.events}
				date={props.eventData.date}
			/>
		</div>
	);
}

export default Day;