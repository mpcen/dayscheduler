import React, { Component } from 'react';
import moment from 'moment';
import TimeBlockList from './TimeBlockList';

class DaySchedule extends Component {
	constructor(props) {		
		super(props);

		this.state = {
			date: this.props.date,
			timeBlocks: []
		}
	}

	generateTimeBlocks(date, prescheduledEvents) {
		const startOfDay = moment(date, "ddd MMM D YYYY").format("M D YYYY"),
			month = startOfDay.split(" ")[0],
			day = startOfDay.split(" ")[1],
			year = startOfDay.split(" ")[2],
			timeBlocks = [];

		for(let minElapsed = 0; minElapsed < 1440; minElapsed += 15)
			timeBlocks.push({
				time: moment()
					.year(year)
					.month(month-1)
					.date(day)
					.hours(0)
					.minutes(minElapsed)
					.seconds(0)
					.milliseconds(0),
				eventScheduled: false,
				events: []
			});

		// if any prescheduled events,
		//process any events that were predefined from an external source (ex: included json file)
		if(prescheduledEvents.length)
			prescheduledEvents.forEach(preScheduledEvent => {
				timeBlocks.find((timeBlock, index) => {
					if(moment(timeBlock.time).format('HH:mm') !== preScheduledEvent.start)
						return false;
					else {
						const eventStart = moment(preScheduledEvent.start, 'HH:mm'),
							eventEnd = moment(preScheduledEvent.end, 'HH:mm'),
							eventDuration = eventEnd.diff(eventStart, 'minutes');

						timeBlock.eventScheduled = true;

						for(let i = 0; i < eventDuration / 15; i++)
							timeBlocks[index + i].events.push(preScheduledEvent);
						
						return true;
					}
				});
			});

		this.setState({ timeBlocks });		
	}

	componentDidMount() {
		this.generateTimeBlocks(this.state.date, this.props.prescheduledEvents);
	}

	render() {
		return (
			<div>
				<TimeBlockList timeBlocks={this.state.timeBlocks} />
			</div>
		);	
	}
}

export default DaySchedule;