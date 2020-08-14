import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import warningIcon from "../../assets/images/icons/warning.svg";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import api from "../../services/api";

import "./styles.css";

function MentorForm() {
	const history = useHistory();

	const [name, setName] = useState("");
	const [avatar, setAvatar] = useState("");
	const [whatsapp, setWhatsapp] = useState("");
	const [bio, setBio] = useState("");

	const [subject, setSubject] = useState("");
	const [cost, setCost] = useState("");

	const [scheduleItems, setScheduleItems] = useState([
		{ week_day: 0, from: "", to: "" },
	]);

	function addNewScheduleItem() {
		setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
	}

	function setScheduleItemValue(
		position: number,
		field: string,
		value: string
	) {
		const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
			if (index === position) {
				return { ...scheduleItem, [field]: value };
			}

			return scheduleItem;
		});

		setScheduleItems(updatedScheduleItems);
	}

	function handleCreateClass(e: FormEvent) {
		e.preventDefault();

		api
			.post("lessons", {
				name,
				avatar,
				whatsapp,
				bio,
				subject,
				cost: Number(cost),
				schedule: scheduleItems,
			})
			.then(() => {
				alert("Registration successful!");

				history.push("/");
			})
			.catch(() => {
				alert("Error during registration.");
			});
	}

	return (
		<div id="page-mentor-form" className="container">
			<PageHeader
				title="Thanks for being a mentor"
				description="Start by registering below"
			/>

			<main>
				<form onSubmit={handleCreateClass}>
					<fieldset>
						<legend>Your details</legend>

						<Input
							name="name"
							label="Full name"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
						<Input
							name="avatar"
							label="Avatar"
							value={avatar}
							onChange={(e) => {
								setAvatar(e.target.value);
							}}
						/>
						<Input
							name="whatsapp"
							label="Whatsapp"
							value={whatsapp}
							onChange={(e) => {
								setWhatsapp(e.target.value);
							}}
						/>
						<Textarea
							name="bio"
							label="About you"
							value={bio}
							onChange={(e) => {
								setBio(e.target.value);
							}}
						/>
					</fieldset>

					<fieldset>
						<legend>Lesson details</legend>

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
								{
									value: "Software Development",
									label: "Software Development",
								},
								{ value: "System Analysis", label: "System Analysis" },
							]}
						/>

						<Input
							name="cost"
							label="Hourly rate"
							value={cost}
							onChange={(e) => {
								setCost(e.target.value);
							}}
						/>
					</fieldset>

					<fieldset>
						<legend>
							Available times
							<button type="button" onClick={addNewScheduleItem}>
								+ Add time
							</button>
						</legend>

						{scheduleItems.map((scheduleItem, index) => {
							return (
								<div key={scheduleItem.week_day} className="schedule-item">
									<Select
										name="week_day"
										label="Week day"
										value={scheduleItem.week_day}
										onChange={(e) =>
											setScheduleItemValue(index, "week_day", e.target.value)
										}
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
										name="from"
										label="From"
										value={scheduleItem.from}
										type="time"
										onChange={(e) =>
											setScheduleItemValue(index, "from", e.target.value)
										}
									/>
									<Input
										name="to"
										label="To"
										value={scheduleItem.to}
										type="time"
										onChange={(e) =>
											setScheduleItemValue(index, "to", e.target.value)
										}
									/>
								</div>
							);
						})}
					</fieldset>

					<footer>
						<p>
							<img src={warningIcon} alt="Warning icon" />
							Attention! <br />
							Please fill out all fields
						</p>
						<button type="submit">Register</button>
					</footer>
				</form>
			</main>
		</div>
	);
}

export default MentorForm;
