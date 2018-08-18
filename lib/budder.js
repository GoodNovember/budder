import { ProgressBar } from "./ProgressBar.js";

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

class CardToggleButton extends React.Component {
	constructor(props) {
		super(props);
		const { isTrue, startOff } = props;
		const self = this;
		self.clickHandler = self.clickHandler.bind(this);
		self.state = {
			isTrue: startOff ? false : true
		};
	}
	clickHandler(event) {
		this.toggle();
	}
	render() {
		return React.createElement(
			"div",
			{
				className: `toggleButton toggleButton${this.state.isTrue ? '--on' : '--off'}`,
				onClick: this.clickHandler },
			this.state.isTrue ? 'ON' : 'OFF'
		);
	}
	toggle() {
		this.setState((prevState, props) => ({
			isTrue: !prevState.isTrue
		}));
	}
}

// class ProgressBar extends React.Component{
// 	constructor(props){
// 		super(props)
// 		const self = this;
// 		self.cvs = React.createRef()
// 		self.state = {
// 			min:props.min || 0,
// 			max:props.max || 100,
// 			value:props.value || 0,
// 			step:props.step || 1,
// 		}
// 	}
// 	componentDidMount(){
// 		const ctx = this.cvs.current
// 	}
// 	render(){
// 		return <canvas className="progress-bar" ref="cvs"/>
// 	}
// }

class Card extends React.Component {
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

function App() {

	const data = [{
		id: 100,
		isActive: false,
		title: ['Cheese'],
		subtitle: ['Weirdo']
	}, {
		id: 200,
		isActive: false,
		title: ['Cheese'],
		subtitle: ['Weirdo']
	}, {
		id: 300,
		isActive: false,
		title: ['Cheese'],
		subtitle: ['Weirdo']
	}, {
		id: 400,
		isActive: false,
		title: ['Cheese'],
		subtitle: ['Weirdo']
	}, {
		id: 500,
		isActive: false,
		title: ['Cheese'],
		subtitle: ['Weirdo w/ progress'],
		hasProgress: true,
		progress: Math.random()
	}];

	return React.createElement(
		"div",
		{ className: "app-root" },
		React.createElement(BudderControl, { cards: data })
	);
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=budder.js.map