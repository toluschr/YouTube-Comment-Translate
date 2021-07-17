(function main () {
	function TranslateButton_SetState() {
		if (this.innerText == TRANSLATE_TEXT) {
			this._text.innerHTML = this._newhtml.outerHTML;
			this.innerText = UNDO_TEXT;
			this.onclick = this._set_state;
		} else {
			this._text.innerHTML = this._oldhtml;
			this.innerText = TRANSLATE_TEXT;
		}
	}

	function TranslateButton_Translate() {
		this.onclick = undefined;
		fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${TARGET}&dt=t&q=${encodeURIComponent(this._text.innerText)}`)
			.then(response => response.json()).then(json => {
				for (let i = 0; i < json[0].length; i++) this._newhtml.innerText += json[0][i][0].replace('\n', ' ');
				this._set_state();
			});
	}

	function TranslateButton(main) {
		let tb = document.createElement("a");
		tb.id = "translate-button";
		tb.style = "margin-left: 5px";
		tb._text = main.querySelector(QS_CONTENT_TEXT);
		tb._oldhtml = tb._text.innerHTML;
		tb._newhtml = document.createElement("span");
		tb._set_state = TranslateButton_SetState;

		tb._newhtml.classList = "style-scope yt-formatted-string translate-text";
		tb.classList = "yt-simple-endpoint style-scope yt-formatted-string";

		tb.innerText = TRANSLATE_TEXT;
		tb.onclick = TranslateButton_Translate;
		return tb;
	}

	/* Query Selectors */
	// From main
	const QS_TRANSLATE_BUTTON = "#header>#header-author>yt-formatted-string>#translate-button";
	// From main
	const QS_CONTENT_TEXT = "#expander>#content>#content-text";
	// From main
	const QS_BUTTON_CONTAINER = "#header>#header-author>yt-formatted-string";
	// From main
	const QS_TRANSLATE_TEXT = ".translate-text";

	/* User settings */
	var TRANSLATE_TEXT = "translate", UNDO_TEXT = "undo", TARGET = "en";

	if (typeof(chrome) !== "undefined" && typeof(chrome.storage) != "undefined")
		chrome.storage.sync.get({translate_text: TRANSLATE_TEXT, undo_text: UNDO_TEXT, target_language: TARGET}, items => {
			TRANSLATE_TEXT = items.translate_text;
			UNDO_TEXT = items.undo_text;
			TARGET = items.target_language;
			inject();
		});
	else
		inject();

	/* Functions */
	// Inject as soon as the comment section was loaded
	function inject () {
		let observerConfig = {childList: true, subtree: true};

		let commentObserver = new MutationObserver(e => {
			for (let mut of e) {
				if (mut.target.id == "comments") {
					commentObserver.disconnect();
					commentObserver.observe(mut.target, observerConfig);
				}

				if (mut.target.tagName.toLowerCase() == "ytd-comment-renderer") {
					let main = mut.target.querySelector("#body>#main")

					let oldTb = main.querySelector(QS_TRANSLATE_BUTTON);
					if (oldTb != null) oldTb.parentNode.removeChild(oldTb);

					let em = main.querySelector(QS_TRANSLATE_TEXT);
					if (em != null) em.parentNode.removeChild(em);

					main.querySelector(QS_BUTTON_CONTAINER).appendChild(TranslateButton(main));
				}
			}
		});

		commentObserver.observe(document, observerConfig);
	}
})();
