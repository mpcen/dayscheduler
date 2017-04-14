import React from 'react';
import moment from 'moment';
import '../styles/DayHeader.css';

const DayHeader = ({date}) => {
	function formatDate(date) {
		return moment(date, "ddd MMM D YYYY").format("dddd, MMMM D, YYYY")
	}

	return (		
		<div className="DayHeader-Container">
			{formatDate(date)}
		</div>
	);
}

export default DayHeader;