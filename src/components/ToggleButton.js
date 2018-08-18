export class ToggleButton extends React.Component{
	constructor(props){
		super(props)
		const {isTrue, startOff} = props
		const self = this
		self.clickHandler = self.clickHandler.bind(this)
		self.state = {
			isTrue: startOff ? !isTrue : isTrue
		}
	}
	clickHandler(event){
		this.toggle()
	}
	render(){
		const onText = this.props.onText || 'ON'
		const offText = this.props.offText || 'OFF'
		return (
			<div 
				className={`toggleButton toggleButton${this.state.isTrue?'--on':'--off'}`}
				onClick={this.clickHandler}>
					{this.state.isTrue?onText:offText}
			</div>
		)
	}
	toggle(){
		this.setState((prevState, props)=>({
			isTrue:!prevState.isTrue
		}),()=>{
			if(typeof this.props.onChange === "function"){
				this.props.onChange(this.state.isTrue)
			}
		})
	}
}