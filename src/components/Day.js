import React from 'react';
import DayHeader from './DayHeader';
import DaySchedule from './DaySchedule';

const Day = (props) => {
	return (
		<div>
			<DayHeader date={props.eventData.date} />
			<DaySchedule
				prescheduledEvents={props.eventData.events}
				date={props.eventData.date}
			/>
		</div>
	);
}

export default Day;