// import fs from "fs";

export default class Page {
	constructor({ element, elements, id }) {
		this.selector = element;
		this.selectorChildren = {
			...elements,
		};

		this.id = id;
	}

	async insertHtml(exmpl) {
		const res = await fetch(exmpl || `${this.id}.html`);
		const html = await res.text();
		document.body.innerHTML = document.body.outerHTML.replace(
			"{%CONTENT%}",
			html
		);
	}
}
