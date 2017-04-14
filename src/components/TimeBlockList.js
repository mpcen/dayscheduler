import React from 'react';
import TimeBlock from './TimeBlock';
import '../styles/TimeBlockList.css';

const TimeBlockList = ({timeBlocks}) => {
	function renderTimeBlocks(timeBlocks) {
		return timeBlocks.map((timeBlock, index) => {
			return (
				<TimeBlock key={index} timeBlock={timeBlock} />
			);
		});
	}

	return (
		<div className="TimeBlockList">
			<ul>
				{renderTimeBlocks(timeBlocks)}
			</ul>
		</div>
	);
}

export default TimeBlockList;