import React from 'react';
import TimeBlock from './TimeBlock';

const TimeBlockList = ({timeBlocks}) => {
	function renderTimeBlocks(timeBlocks) {
		if(!timeBlocks.length) return <li>wtf</li>;

		return timeBlocks.map((timeBlock, index) => {
			return (
				<TimeBlock key={index} timeBlock={timeBlock} />
			);
		});
	}

	return (
		<div>
			<ul>
				{renderTimeBlocks(timeBlocks)}
			</ul>
		</div>
	);
}

export default TimeBlockList;