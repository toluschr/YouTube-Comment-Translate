(function main () {
	function TranslateButton_SetState() {
		if (this._otext.parentNode) {
			this._otext.parentNode.appendChild(this._ntext);
			this._otext.parentNode.removeChild(this._otext);
			this.innerText = UNDO_TEXT;
		} else {
			this._ntext.parentNode.appendChild(this._otext);
			this._ntext.parentNode.removeChild(this._ntext);
			this.innerText = TRANSLATE_TEXT;
		}
	}

	function TranslateButton_Translate() {
		this.onclick = TranslateButton_SetState;
		fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${TARGET}&dt=t&q=${encodeURIComponent(this._otext.innerText)}`)
			.then(response => response.json()).then(json => {
				for (let i = 0; i < json[0].length; i++) this._ntext.innerText += json[0][i][0].replace('\n', ' ');
				this.onclick();
			});
	}

	function TranslateButton(main) {
		let tb = document.createElement("a");
		tb.id = "translate-button";
		tb.style = "margin-left: 5px";
		tb._otext = main.querySelector(QS_CONTENT_TEXT);
		tb._ntext = document.createElement("div");

		tb._ntext.classList = "style-scope ytd-comment-renderer translate-text yt-formatted-string";
		tb._ntext.id = "content-text";

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
		const observerConfig = {childList: true, subtree: true};
		const commentObserver = new MutationObserver(e => {
			for (let mut of e) {
				if (mut.target.id == "comments") {
					commentObserver.disconnect();
					commentObserver.observe(mut.target, observerConfig);
				} else if (mut.target.id == "contents") {
					for (let n of mut.addedNodes) {
						let main = n.querySelector("#body>#main");
						if (!main) continue;

						let tb = main.querySelector(QS_TRANSLATE_BUTTON);
						if (tb != null) {
							if (tb._ntext.parentNode) {
								tb._ntext.parentNode.appendChild(tb._otext);
								tb._ntext.parentNode.removeChild(tb._ntext);
								tb.innerText = TRANSLATE_TEXT;
							}

							tb._ntext.innerText = "";
							tb.onclick = TranslateButton_Translate;
						} else {
							main.querySelector(QS_BUTTON_CONTAINER).appendChild(TranslateButton(main));
						}
					}
				}
			}
		});

		commentObserver.observe(document, observerConfig);
	}
})();
