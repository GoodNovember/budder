const CE = React.createElement

const element = <div>Howdy</div>

class HelloMessage extends React.Component{
	render(){
		return <div>Hello {this.props.name}</div>
	}
}

const container = document.getElementById('root');
ReactDOM.render(<HelloMessage name="Popcorn"/>, container);