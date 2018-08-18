import { Card } from "./Card.js";
import { CardDeck } from "./CardDeck.js";

export class BudderControl extends React.Component {
	constructor(props) {
		super(props);
		const self = this;
		const {
			showTitle,
			cards,
			onChange
		} = props;
		self.state = {
			showTitle: showTitle || "",
			cards: [...cards] || []
		};
		self.handleCardChange = self.handleCardChange.bind(this);
		self.sendChangeUpward = self.sendChangeUpward.bind(this);
	}
	sendChangeUpward(newCards) {
		if (typeof this.props.onChange === "function") {
			this.props.onChange(newCards);
		}
	}
	handleCardChange(data) {
		const self = this;

		const { id, change } = data;

		let out = [];

		this.setState((prevState, props) => {
			const oldCards = prevState.cards;
			const oldCard = oldCards.reduce((acc, card) => {
				if (!acc) {
					if (card.id === id) {
						acc = card;
					}
				}
				return acc;
			}, null);

			const cardClone = Object.assign({}, oldCard, change);

			const newCards = oldCards.map(oldCard => {
				if (cardClone.id === oldCard.id) {
					return cardClone;
				} else {
					return oldCard;
				}
			});

			out = newCards;

			return {
				cards: newCards
			};
		}, () => {
			self.sendChangeUpward(out);
		});
	}
	render() {

		const byPosition = (a, b) => natsort()(a.position, b.position);
		const sortedList = this.state.cards.sort(byPosition);
		const compiledCardList = sortedList.map((card, index) => React.createElement(Card, {
			position: card.position,
			currentIndex: index,
			key: card.id,
			ident: card.id,
			title: card.title,
			subtitle: card.subtitle,
			hasProgress: card.hasProgress,
			progress: card.progress,
			onChange: this.handleCardChange
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
				compiledCardList
			)
		);
	}
}
//# sourceMappingURL=BudderControl.js.map