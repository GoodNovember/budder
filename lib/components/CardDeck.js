import { CardItem } from "./CardItem.js";

export class CardDeck extends React.Component {
	constructor(props) {
		super(props);

		this.handleCardChange = this.handleCardChange.bind(this);
		this.handleCardSelect = this.handleCardSelect.bind(this);
		this.handleShowCardClick = this.handleShowCardClick.bind(this);
		this.handleBlackoutButtonClick = this.handleBlackoutButtonClick.bind(this);
		this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.handlePreviousClick = this.handlePreviousClick.bind(this);

		this.getNextId = this.getNextId.bind(this);
		this.getPrevId = this.getPrevId.bind(this);

		this.canGoForward = this.canGoForward.bind(this);
		this.canGoBack = this.canGoBack.bind(this);

		this.getEnabledCards = this.getEnabledCards.bind(this);
		this.getEnabledIds = this.getEnabledIds.bind(this);

		this.toggleEnabledOnlyMode = this.toggleEnabledOnlyMode.bind(this);

		this.getCardById = this.getCardById.bind(this);

		this.state = {
			cards: Array.isArray(props.cards) ? props.cards : [],
			selectedId: '',
			shownId: '',
			playingId: '',
			isEnabledOnlyMode: false,
			isBlackoutMode: false
		};
	}
	getEnabledCards() {
		return this.state.cards.reduce((acc, card) => {
			if (card.isEnabled) {
				acc.push(card);
			}
			return acc;
		}, []);
	}

	getEnabledIds() {
		return this.getEnabledCards().map(card => card.id);
	}

	getNextId() {
		const enabledIds = this.getEnabledIds();
		const { shownId } = this.state;
		const shownIndex = enabledIds.findIndex(id => id == shownId);
		return shownIndex > -1 && enabledIds.length > shownIndex + 1 ? enabledIds[shownIndex + 1] : !shownId && enabledIds.length > 0 ? enabledIds[0] : null;
	}

	getPrevId() {
		const enabledIds = this.getEnabledIds();
		const { shownId } = this.state;
		const shownIndex = enabledIds.findIndex(id => id == shownId);
		return shownIndex > -1 && shownIndex - 1 >= 0 ? enabledIds[shownIndex - 1] : null;
	}

	canGoForward() {
		return this.getNextId() ? true : false;
	}

	canGoBack() {
		return this.getPrevId() ? true : false;
	}

	toggleEnabledOnlyMode() {
		this.setState(prevState => ({ isEnabledOnlyMode: !prevState.isEnabledOnlyMode }));
	}

	handleNextClick() {
		if (this.canGoForward()) {
			this.setState({
				shownId: this.getNextId(),
				selectedId: ''
			});
		}
	}

	handlePreviousClick() {
		if (this.canGoBack()) {
			this.setState({
				shownId: this.getPrevId(),
				selectedId: ''
			});
		}
	}

	handleShowCardClick(event) {
		if (this.state.shownCard !== this.state.selectedId) {
			if (this.getCardById(this.state.selectedId).isEnabled) {
				this.setState({
					shownId: this.state.selectedId
				});
			}
		}
	}
	handlePlayButtonClick() {
		console.log("Should play", this.state.shownId);
	}
	handleBlackoutButtonClick() {
		this.setState(prevState => {
			return {
				isBlackoutMode: !prevState.isBlackoutMode
			};
		});
	}
	handleCardSelect(cardId) {
		this.setState(prevState => {
			if (prevState.selectedId === cardId) {
				return { selectedId: '' };
			} else {
				return { selectedId: cardId };
			}
		});
	}
	handleCardChange(cardData) {
		this.setState(prevState => ({
			cards: prevState.cards.map(card => card.id === cardData.id ? Object.assign({}, card, cardData) : card)
		}), () => {
			if (typeof this.props.onChange === "function") {
				this.props.onChange(cardData);
			}
		});
	}

	getCardById(id) {
		return this.state.cards.reduce((acc, card) => {
			if (!acc) {
				if (card.id === id) {
					acc = card;
				}
			}
			return acc;
		}, null);
	}

	render() {
		const self = this;

		const {
			state,
			handleCardChange,
			handleCardSelect,
			handleShowCardClick,
			handleBlackoutButtonClick,
			handlePlayButtonClick,
			handlePreviousClick,
			handleNextClick,
			getCardById
		} = self;

		const {
			cards,
			selectedId,
			shownId,
			playingId,
			isEnabledOnlyMode,
			isBlackoutMode
		} = state;

		const selectedCard = getCardById(selectedId);
		const shownCard = getCardById(shownId);

		const selectedIsShown = selectedCard && shownCard && selectedCard.id === shownCard.id ? true : false;
		const canShowCard = selectedCard && selectedCard.isEnabled ? true : false;
		const isPlayEnabled = shownCard && shownCard.hasProgress;

		const canGoForward = this.canGoForward();
		const canGoBack = this.canGoBack();

		const disabledCardCount = cards.reduce((acc, card) => {
			if (card.isEnabled === false) {
				acc++;
			}
			return acc;
		}, 0);

		const sorter = (a, b) => natsort()(a.placement, b.placement);

		const CardCollection = Array.isArray(cards) ? cards.sort(sorter).map(card => {

			if (card.isEnabled === false && isEnabledOnlyMode) {
				return null;
			} else {
				return React.createElement(CardItem, {
					selectedId: selectedId,
					shownId: shownId,
					playingId: playingId,
					onSelect: handleCardSelect,
					key: card.id,
					data: card,
					onChange: handleCardChange });
			}
		}) : null;

		return React.createElement(
			'div',
			{ className: 'card-deck' },
			React.createElement(
				'div',
				{ className: 'card-deck__top-bar' },
				disabledCardCount > 0 ? React.createElement(
					'div',
					{ onClick: this.toggleEnabledOnlyMode },
					isEnabledOnlyMode ? 'Show Disabled' : 'Hide Disabled'
				) : null
			),
			React.createElement(
				'div',
				{ className: 'card-deck__card-list' },
				CardCollection
			),
			React.createElement(
				'div',
				{ className: 'card-deck__bottom-bar' },
				React.createElement(
					'div',
					{ className: 'card-deck__button-corral' },
					canShowCard && !selectedIsShown ? React.createElement(
						'div',
						{ className: 'card-deck__control-button --show', onClick: handleShowCardClick },
						React.createElement('i', { className: 'fa fa-upload' }),
						selectedCard ? `${selectedCard.title}` : null
					) : null,
					React.createElement(
						'div',
						{ onClick: handleBlackoutButtonClick, className: `card-deck__control-button --blackout ${isBlackoutMode ? '--on' : '--off'}` },
						React.createElement('i', { className: 'fa fa-crow' })
					),
					React.createElement(
						'div',
						{ onClick: handlePreviousClick, className: `card-deck__control-button --previous ${canGoBack ? '--enabled' : '--disabled'}` },
						React.createElement('i', { className: 'fa fa-step-backward' })
					),
					React.createElement(
						'div',
						{ onClick: handlePlayButtonClick, className: `card-deck__control-button --play ${isPlayEnabled ? '--enabled' : '--disabled'}` },
						React.createElement('i', { className: 'fa fa-play' })
					),
					React.createElement(
						'div',
						{ onClick: handleNextClick, className: `card-deck__control-button --next ${canGoForward ? '--enabled' : '--disabled'}` },
						React.createElement('i', { className: 'fa fa-step-forward' })
					)
				)
			)
		);
	}
}
//# sourceMappingURL=CardDeck.js.map