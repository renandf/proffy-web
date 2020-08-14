import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";
import api from "../../services/api";

export interface Mentor {
	id: number;
	name: string;
	avatar: string;
	whatsapp: string;
	bio: string;
	cost: number;
	subject: string;
}

interface MentorItemProps {
	mentor: Mentor;
}

const MentorItem: React.FC<MentorItemProps> = ({ mentor }) => {
	function createNewConnection() {
		api.post("connections", {
			user_id: mentor.id,
		});
	}

	return (
		<article className="mentor-item">
			<header>
				<img src={mentor.avatar} alt={mentor.name} />
				<div>
					<strong>{mentor.name}</strong>
					<span>{mentor.subject}</span>
				</div>
			</header>
			<p>{mentor.bio}</p>

			<footer>
				<p>
					Price per hour
					<strong>${mentor.cost}</strong>
				</p>

				<a
					target="_blank"
					rel="noopener noreferrer"
					onClick={createNewConnection}
					href={`https://wa.me/${mentor.whatsapp}`}
				>
					<img src={whatsappIcon} alt="Whatsapp icon" />
					Get in touch
				</a>
			</footer>
		</article>
	);
};

export default MentorItem;
