import { ProgressBar } from "./ProgressBar.js";
import { Card } from "./Card.js";

class BudderControl extends React.Component {
	constructor(props) {
		super(props);
		const self = this;
		self.state = {
			showTitle: props.showTitle || "",
			cards: props.cards || []
		};
	}
	render() {
		const cardList = this.state.cards.map((card, index) => React.createElement(Card, {
			currentIndex: index,
			key: card.id,
			title: card.title,
			subtitle: card.subtitle,
			hasProgress: card.hasProgress,
			progress: card.progress
		}));
		return React.createElement(
			"div",
			{ className: "budder-control" },
			React.createElement(
				"div",
				null,
				"Budder"
			),
			React.createElement(
				"div",
				{ className: "card-list" },
				cardList
			)
		);
	}
}
//# sourceMappingURL=BudderControl.js.map