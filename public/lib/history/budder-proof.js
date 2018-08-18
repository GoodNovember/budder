const CE = React.createElement;

const element = React.createElement(
	"div",
	null,
	"Howdy"
);

class HelloMessage extends React.Component {
	render() {
		return React.createElement(
			"div",
			null,
			"Hello ",
			this.props.name
		);
	}
}

const container = document.getElementById('root');
ReactDOM.render(React.createElement(HelloMessage, { name: "Popcorn" }), container);
//# sourceMappingURL=budder-proof.js.map