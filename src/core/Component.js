export class Component {
	$target;
	props;
	state;
	registeredEvents;

	mount($target, props) {
		this.$target = $target;
		this.props = props;
		this.registeredEvents = [];

		this.render();
		this.setEvent();
		this.mounted();
	}

	mounted() {}

	setState(newState) {
		// 상태 업데이트 후 리렌더링 한다.
		this.state = { ...this.state, ...newState };
		this.render();
	}

	render() {
		this.$target.innerHTML = this.template();
		this.updated();
	}

	updated() {}

	willUnmount() {
		// 언마운트 전 등록된 이벤트리스너를 모두 제거한다.
		this.registeredEvents.forEach(({ type, eventListener }) => {
			this.$target.removeEventListener(type, eventListener);
		});
	}

	template() {
		return '';
	}

	setEvent() {}

	addEvent(type, selector, callback) {
		// 언마운트 시 이벤트리스너를 제거하기 위해 이벤트리스너들을 배열로 관리한다.
		const children = [...this.$target.querySelectorAll(selector)];
		const isTarget = (target) =>
			children.includes(target) || target.closest(selector);
		this.registeredEvents = this.registeredEvents.concat({
			type: type,
			eventListener: (e) => {
				if (!isTarget(e.target)) return;
				callback(e);
			},
		});

		const recentlyAddedEvent =
			this.registeredEvents[this.registeredEvents.length - 1];

		this.$target.addEventListener(type, recentlyAddedEvent.eventListener);
	}
}
