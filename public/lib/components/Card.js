import { ProgressBar } from "./ProgressBar.js";
import { ToggleButton } from "./ToggleButton.js";
import { EditableText } from "./EditableText.js";

export class Card extends React.Component {
	constructor(props) {
		super(props);
		const {
			ident,
			title,
			subtitle,
			currentIndex,
			position,
			onChange
		} = props;
		const self = this;
		self.state = {
			ident,
			currentIndex,
			position,
			title,
			subtitle,
			progress: props.progress || 0
		};

		this.handlePositionChange = this.handlePositionChange.bind(this);
		this.sendChangeUpward = typeof onChange === "function" ? onChange : () => {};
	}

	componentWillUnmount() {
		this.shouldContinueHeartbeat = false;
	}
	handlePositionChange(data) {
		const id = this.props.ident;
		const change = { position: data.value };
		this.setState(change, () => {
			this.sendChangeUpward({
				id,
				change
			});
		});
	}

	render() {

		return React.createElement(
			"div",
			{ className: "card" },
			React.createElement(
				"div",
				{ className: "card__body" },
				React.createElement(EditableText, { className: "card__position", value: this.state.position, onBlur: this.handlePositionChange }),
				React.createElement(ToggleButton, { className: "card__enabled", startOff: false, isTrue: this.state.isActive, onText: "Enabled", offText: "Disabled" }),
				React.createElement(EditableText, { className: "card__title long", value: this.state.title, onBlur: this.handleTitleUpdate }),
				React.createElement(EditableText, { className: "card__subtitle long", value: this.state.subtitle }),
				React.createElement("div", { className: "spacer" })
			),
			this.props.hasProgress ? React.createElement(ProgressBar, { progress: this.state.progress }) : null
		);
	}
}
//# sourceMappingURL=Card.js.map