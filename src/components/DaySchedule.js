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

		// generate a timeblock for each 15 minute block in a day
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
				events: []
			});

		// Sort (in-place) predefined events in ascending order of end time.
		prescheduledEvents.sort((eventA, eventB) => {
			if(Number(eventA.end.replace(':', '.')) === Number(eventB.end.replace(':', '.')))
				return Number(eventA.start.replace(':', '.')) - Number(eventB.start.replace(':', '.'));
			return Number(eventA.end.replace(':', '.')) - Number(eventB.end.replace(':', '.'));
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

				preScheduledEvent.eventDuration = eventDuration;

			// for each timeblock in an event
			for(let i = 0; i < eventDuration / 15; i++) {
				// if an overlapped event has finished , store an empty event so 
				// timeblocks remain vertically aligned. (a bit hacky but works)
				if(timeBlocks[timeBlockIndex + i].events.length < eventsAtStart)
					for(let j = 0; j < eventsAtStart; j++)
						timeBlocks[timeBlockIndex + i].events.push({title: '', start: '', end: '', eventDuration: 0});

				// store the actual event in the timeblock
				timeBlocks[timeBlockIndex + i].events.push(preScheduledEvent);

				// sort the timeblock in ascending order of start time.
				if(timeBlocks[timeBlockIndex + i].events.length > 1)
					timeBlocks[timeBlockIndex + i].events.sort((eventA, eventB) => {
						return Number(eventA.start.replace(':', '.')) - Number(eventB.start.replace(':', '.'));
					});
			}
		});

		// set the state of the entire day
		this.setState({ timeBlocks });		
	}

	componentDidMount() {
		this.generateTimeBlocks(this.state.date, this.props.prescheduledEvents);
	}

	render() {
		return <TimeBlockList timeBlocks={this.state.timeBlocks} />;	
	}
}

export default DaySchedule;