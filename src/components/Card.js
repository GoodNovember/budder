import { ProgressBar } from "./ProgressBar.js"
import { ToggleButton } from "./ToggleButton.js"
import { EditableText } from  "./EditableText.js"

export class Card extends React.Component{
	constructor(props){
		super(props)
		const {
			ident,
			title,
			subtitle,
			currentIndex,
			position,
			onChange,
		} = props
		const self = this
		self.state = {
			ident,
			currentIndex,
			position,
			title,
			subtitle,
			progress: props.progress || 0,
		}

		this.handlePositionChange = this.handlePositionChange.bind(this)
		this.sendChangeUpward = typeof onChange === "function" ? onChange : () => {}
	}

	componentWillUnmount(){
		this.shouldContinueHeartbeat = false
	}
	handlePositionChange(data){
		const id = this.props.ident
		const change = {position:data.value}
		this.setState(change,()=>{
			this.sendChangeUpward({
				id,
				change
			})
		})
	}
	handle
	render(){

		return (
			<div className="card">
				<div className="card__body">
					<EditableText className="card__position" value={this.state.position} onBlur={this.handlePositionChange}/>
					<ToggleButton className="card__enabled" startOff={false} isTrue={this.state.isActive} onText="Enabled" offText="Disabled"/>
					<EditableText className="card__title long" value={this.state.title} onBlur={this.handleTitleUpdate}/>
					<EditableText className="card__subtitle long" value={this.state.subtitle}/>
					<div className="spacer"></div>
				</div>
				{this.props.hasProgress ? (<ProgressBar progress={this.state.progress}/>):null}
			</div>
		)

	}
}