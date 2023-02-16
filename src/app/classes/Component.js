import EventEmitter from "events";
import each from "lodash/each";

export default class Component extends EventEmitter {
	constructor({ element, elements }) {
		super();

		this.selector = element;
		this.selectorChildren = { ...elements };

		this.create();
		this.addEventListeners();
	}

	create() {
		if (this.selector instanceof window.HTMLElement) {
			this.element = this.selector;
		} else {
			this.element = document.querySelector(this.selector);
		}

		this.elements = {};

		each(this.selectorChildren, (entry, key) => {
			if (
				entry instanceof window.HTMLElement ||
				entry instanceof window.NodeList ||
				Array.isArray(entry)
			) {
				this.elements[key] = entry;
			} else {
				this.elements[key] = document.querySelectorAll(entry);

				if (this.elements[key].length === 0) {
					// If entry doesn't exist (the NodeList is empty) we set it to null
					this.elements[key] = null;
				} else if (this.elements[key].length === 1) {
					// If the returned NodeList contains only 1 element, we querySelector that element
					this.elements[key] = document.querySelector(entry);
				}
			}
		});
	}

	addEventListeners() {}

	removeEventListeners() {}
}
