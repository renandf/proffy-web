import React, { useState, FormEvent } from "react";

import PageHeader from "../../components/PageHeader";
import MentorItem, { Mentor } from "../../components/MentorItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

import "./styles.css";

function MentorList() {
	const [mentors, setMentors] = useState([]);

	const [subject, setSubject] = useState("");
	const [week_day, setWeekDay] = useState("");
	const [time, setTime] = useState("");

	async function searchMentors(e: FormEvent) {
		e.preventDefault();

		const response = await api.get("lessons", {
			params: {
				subject,
				week_day,
				time,
			},
		});

		setMentors(response.data);
	}

	return (
		<div id="page-mentor-list" className="container">
			<PageHeader title="Available mentors">
				<form id="search-mentors" onSubmit={searchMentors}>
					<Select
						name="subject"
						label="Subject"
						value={subject}
						onChange={(e) => {
							setSubject(e.target.value);
						}}
						options={[
							{ value: "Business Analysis", label: "Business Analysis" },
							{ value: "Cloud Computing", label: "Cloud Computing" },
							{ value: "Cyber Security", label: "Cyber Security" },
							{ value: "Data Analysis", label: "Data Analysis" },
							{ value: "Data Science", label: "Data Science" },
							{ value: "Design", label: "Design" },
							{ value: "Marketing", label: "Marketing" },
							{ value: "Management", label: "Management" },
							{ value: "Network Security", label: "Network Security" },
							{ value: "SEO", label: "SEO" },
							{ value: "Software Development", label: "Software Development" },
							{ value: "System Analysis", label: "System Analysis" },
						]}
					/>

					<Select
						name="week_day"
						label="Week day"
						value={week_day}
						onChange={(e) => {
							setWeekDay(e.target.value);
						}}
						options={[
							{ value: "0", label: "Sunday" },
							{ value: "1", label: "Monday" },
							{ value: "2", label: "Tuesday" },
							{ value: "3", label: "Wednesday" },
							{ value: "4", label: "Thursday" },
							{ value: "5", label: "Friday" },
							{ value: "6", label: "Saturday" },
						]}
					/>

					<Input
						type="time"
						name="time"
						label="Time"
						value={time}
						onChange={(e) => {
							setTime(e.target.value);
						}}
					/>

					<button type="submit">Search</button>
				</form>
			</PageHeader>

			<main>
				{mentors.map((mentor: Mentor) => {
					return <MentorItem key={mentor.id} mentor={mentor} />;
				})}
			</main>
		</div>
	);
}

export default MentorList;
