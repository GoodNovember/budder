class ProgressBar extends React.Component {
	constructor(props) {
		super(props);
		const {
			progress
		} = props;
		const self = this;
		self.state = {
			progress: progress || 0.0
		};
		self.cvs = React.createRef();
	}
	componentDidMount() {
		const self = this;
		const ctx = self.cvs.current.getContext('2d');

		const size = ctx => {
			const dpr = window.devicePixelRatio || 1.0;
			const targetElm = ctx.canvas;
			const targetWidth = targetElm.clientWidth * dpr;
			const targetHeight = targetElm.clientHeight * dpr;
			if (ctx.canvas.width !== targetWidth || ctx.canvas.height !== targetHeight) {
				ctx.canvas.width = targetWidth;
				ctx.canvas.height = targetHeight;
			}
		};
		const clear = ctx => ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		const draw = ctx => {
			ctx.beginPath();
			ctx.fillStyle = 'black';
			ctx.rect(0, 0, self.state.progress * ctx.canvas.width, ctx.canvas.height);
			ctx.fill();
		};

		function heartbeat(timestamp) {
			if (self.shouldContinueHeartbeat) {
				requestAnimationFrame(heartbeat);
			}

			size(ctx);
			clear(ctx);
			draw(ctx);
		}

		requestAnimationFrame(heartbeat);
	}
	componentWillUnmount() {
		this.shouldContinueHeartbeat = false;
	}
	render() {
		return React.createElement('canvas', { className: 'progress-bar', ref: this.cvs });
	}
}

module.exports = { ProgressBar };
//# sourceMappingURL=ProgressBar.js.map