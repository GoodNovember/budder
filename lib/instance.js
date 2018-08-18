import { CardDeck } from "./components/CardDeck.js";

const data = [{
	id: 100,
	placement: 'A',
	isActive: false,
	isEnabled: true,
	title: 'Cheese',
	subtitle: 'Weirdo',
	kind: 'title'
}, {
	id: 200,
	placement: 'B',
	isActive: false,
	isEnabled: true,
	title: 'Cheese',
	subtitle: 'Weirdo'
}, {
	id: 300,
	placement: "C",
	isActive: false,
	isEnabled: true,
	title: 'Cheese',
	subtitle: 'Weirdo'
}, {
	id: 400,
	placement: "D",
	isActive: false,
	isEnabled: true,
	title: 'Cheese',
	subtitle: 'Weirdo'
}, {
	id: 500,
	placement: 'E',
	isActive: false,
	isEnabled: true,
	title: 'Cheese',
	subtitle: 'Weirdo w/ progress',
	hasProgress: true,
	progress: Math.random()
}];

const App = () => React.createElement(CardDeck, { cards: data });

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=instance.js.map