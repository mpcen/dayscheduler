import React from 'react';
import moment from 'moment';

const DayHeader = ({date}) => {
	function formatDate(date) {
		return moment(date, "ddd MMM D YYYY").format("dddd, MMMM D, YYYY")
	}

	return (		
		<div>
			{formatDate(date)}
		</div>
	);
}

export default DayHeader;