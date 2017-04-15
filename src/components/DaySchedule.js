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
		const
			startOfDay = moment(date, "ddd MMM D YYYY").format("M D YYYY"),
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

		//process any events that were predefined from an external source (ex: included json file)
		prescheduledEvents.forEach(preScheduledEvent => {
			const
				eventStart = moment(preScheduledEvent.start, 'HH:mm'),
				eventEnd = moment(preScheduledEvent.end, 'HH:mm'),
				eventDuration = eventEnd.diff(eventStart, 'minutes'),
				timeBlockIndex = timeBlocks.findIndex(timeBlock => {
					return moment(timeBlock.time).format('HH:mm') === preScheduledEvent.start;
				}),
				eventsAtStart = timeBlocks[timeBlockIndex].events.length;

			for(let i = 0; i < eventDuration / 15; i++) {
				timeBlocks[timeBlockIndex + i].eventScheduled = true;

				if(timeBlocks[timeBlockIndex + i].events.length < eventsAtStart) {
					for(let j = 0; j < eventsAtStart - timeBlocks[timeBlockIndex + i].events.length; j++) {
						timeBlocks[timeBlockIndex + i].events.push({title: '', start: '', end: ''});						
					}
				}

				timeBlocks[timeBlockIndex + i].events.push(preScheduledEvent);
				
				if(timeBlocks[timeBlockIndex + i].events.length > 1) {
					timeBlocks[timeBlockIndex + i].events.sort((eventA, eventB) => {
						return Number(eventA.start.replace(':', '.')) - Number(eventB.start.replace(':', '.'));
					});
				}
			}
		});

		this.setState({ timeBlocks });		
	}

	componentDidMount() {
		this.generateTimeBlocks(this.state.date, this.props.prescheduledEvents);
	}

	render() {
		return (
			<TimeBlockList timeBlocks={this.state.timeBlocks} />
		);	
	}
}

export default DaySchedule;