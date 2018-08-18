import { ProgressBar } from "./ProgressBar.js";

export class CardItem extends React.Component {
	constructor(props) {
		super(props);
		const self = this;

		self.handleEnabledChange = self.handleEnabledChange.bind(this);
		self.handleTitleChange = self.handleTitleChange.bind(this);
		self.handleSubtitleChange = self.handleSubtitleChange.bind(this);
		self.handlePlacementChange = self.handlePlacementChange.bind(this);
		self.handleSrcChange = self.handleSrcChange.bind(this);
		self.handleSelectClick = self.handleSelectClick.bind(this);
		self.toggleEnabled = self.toggleEnabled.bind(this);

		self.state = {
			id: props.data.id || '',
			src: props.data.src || '',
			isEnabled: props.data.isEnabled ? true : false,
			title: props.data.title || '',
			subtitle: props.data.subtitle || '',
			placement: props.data.placement || '',
			hasProgress: props.data.hasProgress || false,
			progress: props.data.progress || 0
		};
	}
	toggleEnabled() {
		this.setState(prevState => {
			return {
				isEnabled: !prevState.isEnabled
			};
		}, () => {
			const {
				id, isEnabled
			} = this.state;
			if (typeof this.props.onChange === "function") {
				this.props.onChange({
					id, isEnabled
				});
			}
		});
	}
	handleEnabledChange(isEnabled) {
		this.setState(prevState => ({
			id: prevState.id,
			isEnabled
		}), () => {
			const id = this.state.id;
			if (typeof this.props.onChange === "function") {
				this.props.onChange({
					id,
					isEnabled
				});
			}
		});
	}
	handleTitleChange(event) {
		const title = event.target.value;
		this.setState(prevState => ({
			id: prevState.id,
			title
		}), () => {
			const id = this.state.id;
			if (typeof this.props.onChange === "function") {
				this.props.onChange({
					id,
					title
				});
			}
		});
	}
	handleSubtitleChange(event) {
		const subtitle = event.target.value;
		this.setState(prevState => ({
			id: prevState.id,
			subtitle
		}), () => {
			const id = this.state.id;
			if (typeof this.props.onChange === "function") {
				this.props.onChange({
					id,
					subtitle
				});
			}
		});
	}
	handlePlacementChange(event) {
		const placement = event.target.value;
		this.setState(prevState => ({
			id: prevState.id,
			placement
		}), () => {
			const id = this.state.id;
			if (typeof this.props.onChange === "function") {
				this.props.onChange({
					id,
					placement
				});
			}
		});
	}
	handleSrcChange(event) {
		const src = event.target.value;
		this.setState(prevState => ({
			id: prevState.id,
			src
		}), () => {
			const id = this.state.id;
			if (typeof this.props.onChange === "function") {
				this.props.onChange({
					id,
					src
				});
			}
		});
	}
	handleSelectClick(event) {
		if (typeof this.props.onSelect === 'function') {
			this.props.onSelect(this.state.id);
		}
	}

	render() {

		const self = this;

		const {
			state,
			handlePlacementChange,
			handleTitleChange,
			handleSubtitleChange,
			handleSrcChange,
			toggleEnabled,
			handleSelectClick
		} = self;

		const {
			id,
			title,
			isEnabled,
			placement,
			subtitle,
			src,
			hasProgress,
			progress
		} = state;

		const isSelected = this.props.selectedId === id;
		const isShown = this.props.shownId === id;

		return React.createElement(
			'div',
			{ className: `card-item ${isEnabled ? 'card-item--state-enabled' : 'card-item--state-disabled'} ${isSelected ? 'card-item--state-selected' : ''} ${isShown ? 'card-item--state-shown' : ''}` },
			React.createElement(
				'div',
				{ className: 'card-item__controls' },
				isEnabled && !isShown ? React.createElement(
					'div',
					{ onClick: handleSelectClick, className: 'card-item__toggle-button' },
					React.createElement('i', { className: isSelected ? 'fa fa-circle' : 'far fa-circle' })
				) : React.createElement('div', { className: 'card-item__toggle-button' }),
				!isShown ? React.createElement(
					'div',
					{ className: 'card-item__toggle-button', onClick: toggleEnabled },
					React.createElement('i', { className: isEnabled ? 'fa fa-eye' : 'fa fa-eye-slash' })
				) : React.createElement('div', { className: 'card-item__toggle-button' }),
				isEnabled && !isShown ? React.createElement('input', { type: 'text', className: 'card-item__placement', value: placement, onChange: handlePlacementChange }) : React.createElement(
					'div',
					{ className: 'card-item__placement --fixed' },
					placement
				),
				React.createElement('input', { type: 'text', className: 'card-item__title', value: title, onChange: handleTitleChange }),
				React.createElement('input', { type: 'text', className: 'card-item__subtitle', value: subtitle, onChange: handleSubtitleChange }),
				React.createElement('input', { type: 'text', className: 'card-item__src', value: src, onChange: handleSrcChange })
			),
			hasProgress ? React.createElement(
				'div',
				{ className: 'card_item__progress' },
				React.createElement(ProgressBar, { progress: progress })
			) : null
		);
	}
}
//# sourceMappingURL=CardItem.js.map