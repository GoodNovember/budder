import {ProgressBar} from "./components/ProgressBar.js"

class BudderControl extends React.Component{
	constructor(props){
		super(props)
		const self = this
		self.state = {
			showTitle: props.showTitle || "",
			cards:props.cards || [],
		}
	}
	render(){
		const cardList = this.state.cards.map((card,index)=>(
			<Card 
				currentIndex={index}
				key={card.id} 
				title={card.title}
				subtitle={card.subtitle} 
				hasProgress={card.hasProgress}
				progress={card.progress}
				/>
		))
		return (
			<div className="budder-control">
				<div>Budder</div>
				<div className="card-list">{cardList}</div>
			</div>
		)
	}
}

class CardToggleButton extends React.Component{
	constructor(props){
		super(props)
		const {isTrue, startOff} = props
		const self = this
		self.clickHandler = self.clickHandler.bind(this)
		self.state = {
			isTrue: startOff ? false : true
		}
	}
	clickHandler(event){
		this.toggle()
	}
	render(){
		return (
			<div 
				className={`toggleButton toggleButton${this.state.isTrue?'--on':'--off'}`}
				onClick={this.clickHandler}>
					{this.state.isTrue?'ON':'OFF'}
			</div>
		)
	}
	toggle(){
		this.setState((prevState, props)=>({
			isTrue:!prevState.isTrue
		}))
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

class Card extends React.Component{
	constructor(props){
		super(props)
		const {
			title,
			subtitle,
			currentIndex,
		} = props
		const titleCollection = title || []
		const subtitleCollection = subtitle || []
		const self = this
		self.state = {
			currentIndex,
			title:[...titleCollection],
			subtitle:[...subtitleCollection],
			progress: props.progress || 0,
		}
		self.cvs = React.createRef()
	}

	componentWillUnmount(){
		this.shouldContinueHeartbeat = false
	}
	render(){

		const titles = this.state.title.map((title, index)=><div className="card_titles card__title" key={index}>{title}</div>)
		const subtitles = this.state.subtitle.map((subtitle, index)=><div className="card_subtitles card__subtitle" key={index}>{subtitle}</div>)

		return (
			<div className="card">
				<div className="card__body">
					<div className="order">{this.props.currentIndex + 1}</div>
					<CardToggleButton startOff={false} isTrue={this.state.isActive}/>
					<div className="card__titles">{titles}</div>
					<div className="card__subtitles">{subtitles}</div>
					<div className="spacer"></div>
				</div>
				{this.props.hasProgress ? (<ProgressBar progress={this.state.progress}/>):null}
			</div>
		)

	}
}

function App(){

	const data = [
		{
			id:100,
			isActive:false,
			title:['Cheese'],
			subtitle:['Weirdo']
		},{
			id:200,
			isActive:false,
			title:['Cheese'],
			subtitle:['Weirdo']
		},{
			id:300,
			isActive:false,
			title:['Cheese'],
			subtitle:['Weirdo']
		},{
			id:400,
			isActive:false,
			title:['Cheese'],
			subtitle:['Weirdo']
		},{
			id:500,
			isActive:false,
			title:['Cheese'],
			subtitle:['Weirdo w/ progress'],
			hasProgress:true,
			progress:Math.random(),
		}
	]

	return (
		<div className="app-root">
			<BudderControl cards={data}/>
		</div>
	)
}


ReactDOM.render(<App/>,document.getElementById('root'))