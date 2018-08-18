import { ProgressBar } from "./ProgressBar.js";

export class Card extends React.Component {
	constructor(props) {
		super(props);
		const {
			title,
			subtitle,
			currentIndex
		} = props;
		const titleCollection = title || [];
		const subtitleCollection = subtitle || [];
		const self = this;
		self.state = {
			currentIndex,
			title: [...titleCollection],
			subtitle: [...subtitleCollection],
			progress: props.progress || 0
		};
		self.cvs = React.createRef();
	}

	componentWillUnmount() {
		this.shouldContinueHeartbeat = false;
	}
	render() {

		const titles = this.state.title.map((title, index) => React.createElement(
			"div",
			{ className: "card_titles card__title", key: index },
			title
		));
		const subtitles = this.state.subtitle.map((subtitle, index) => React.createElement(
			"div",
			{ className: "card_subtitles card__subtitle", key: index },
			subtitle
		));

		return React.createElement(
			"div",
			{ className: "card" },
			React.createElement(
				"div",
				{ className: "card__body" },
				React.createElement(
					"div",
					{ className: "order" },
					this.props.currentIndex + 1
				),
				React.createElement(CardToggleButton, { startOff: false, isTrue: this.state.isActive }),
				React.createElement(
					"div",
					{ className: "card__titles" },
					titles
				),
				React.createElement(
					"div",
					{ className: "card__subtitles" },
					subtitles
				),
				React.createElement("div", { className: "spacer" })
			),
			this.props.hasProgress ? React.createElement(ProgressBar, { progress: this.state.progress }) : null
		);
	}
}
//# sourceMappingURL=Card.js.map