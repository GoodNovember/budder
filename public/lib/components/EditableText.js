export class EditableText extends React.Component {
	constructor(props) {
		super(props);
		const self = this;

		const {
			value,
			hintText
		} = props;

		self.state = {
			isEditMode: false,
			value: value || '',
			hintText: hintText || '(Enter Text)'
		};

		self.textElm = React.createRef();

		self.handleSubmit = self.handleSubmit.bind(this);
		self.handleClick = self.handleClick.bind(this);
		self.handleBlur = self.handleBlur.bind(this);
		self.handleChange = self.handleChange.bind(this);
		self.handleValueChange = self.handleValueChange.bind(this);

		self.toggleEditMode = self.toggleEditMode.bind(this);
	}
	handleSubmit(event) {
		this.handleSubmit();
	}
	toggleEditMode(cb) {
		return this.setState((prevState, props) => {
			return {
				isEditMode: !prevState.isEditMode
			};
		}, cb);
	}
	handleClick(event) {
		const self = this;
		self.toggleEditMode(() => {
			self.textElm.current.focus();
		});
	}
	handleBlur(event) {
		const self = this;
		const { value } = this.textElm.current;
		self.toggleEditMode(() => {
			self.setState({ value }, () => {
				if (typeof self.props.onBlur === 'function') {
					self.props.onBlur({ value });
				}
			});
		});
	}
	handleChange(event) {
		const self = this;
		const { value } = this.textElm.current;
		self.handleValueChange(value);
	}
	handleValueChange(value) {
		const self = this;
		this.setState({ value }, () => {
			if (typeof this.props.onChange === "function") {
				this.props.onChange(value);
			}
		});
	}
	render() {
		const self = this;
		const {
			state, props, textElm,
			handleBlur,
			handleClick,
			handleChange
		} = self;
		const { isEditMode, value, hintText } = state;
		const { className } = props;

		return React.createElement(
			'div',
			{ className: `${className ? className : ''} editable-text ${isEditMode ? 'editable-text--edit-mode' : ''}` },
			React.createElement(
				'form',
				{ className: 'editable-text__form', onSubmit: this.handleSubmit },
				React.createElement('input', { className: 'editable-text__input', onChange: handleChange, ref: textElm, onBlur: handleBlur, type: 'text', value: this.state.value, placeholder: hintText })
			),
			React.createElement(
				'div',
				{ className: 'editable-text__label', onClick: handleClick },
				value || hintText
			)
		);
	}
}
//# sourceMappingURL=EditableText.js.map