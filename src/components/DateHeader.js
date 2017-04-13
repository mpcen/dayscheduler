import React from 'react';
import moment from 'moment';

const DateHeader = ({date}) => {
	function formatDate(date) {
		return moment(date, "ddd MMM D YYYY").format("dddd, MMMM D, YYYY")
	}

	return (		
		<div>
			<h1>{formatDate(date)}</h1>
		</div>
	);
}

export default DateHeader;