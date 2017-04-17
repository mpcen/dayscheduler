import React from 'react';
import DayHeader from './DayHeader';
import DaySchedule from './DaySchedule';

const Day = ({eventData}) => {
	return (
		<div>
			<DayHeader date={eventData.date} />
			<DaySchedule
				prescheduledEvents={eventData.events}
				date={eventData.date}
			/>
		</div>
	);
}

export default Day;