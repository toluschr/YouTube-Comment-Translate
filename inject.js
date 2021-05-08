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
		fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${TARGET}&dt=t&q=${encodeURI(this._text.innerText)}`)
			.then(response => response.json()).then(json => {
				for (let i = 0; i < json[0].length; i++) this._newhtml.innerText += json[0][i][0];
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

		tb._newhtml.classList = "style-scope yt-formatted-string";
		tb.classList = "yt-simple-endpoint style-scope yt-formatted-string";

		tb.innerText = TRANSLATE_TEXT;
		tb.onclick = TranslateButton_Translate;
		return tb;
	}

	/* Query Selectors */
	// From document
	const QS_COMMENTS = "ytd-comments>ytd-item-section-renderer>div#contents, #loaded-comments";
	// From "ytd-comment-thread-renderer"
	const QS_COMMENT_MAIN = "#comment>#body>#main";
	// From "ytd-comment-thread-renderer"
	const QS_REPLY_MAIN = "#body>#main";
	// From repliesRenderer
	const QS_LOADED_REPLIES = "#expander>#expander-contents>#loaded-replies";
	// From main
	const QS_TRANSLATE_BUTTON = "#header>#header-author>yt-formatted-string>#translate-button";
	// From main
	const QS_CONTENT_TEXT = "#expander>#content>#content-text";
	// From main
	const QS_BUTTON_CONTAINER = "#header>#header-author>yt-formatted-string";
	// From commentThreadRenderer
	const QS_REPLIES_RENDERER = "#replies>.style-scope";

	/* User settings */
	var TRANSLATE_TEXT = "translate", UNDO_TEXT = "undo", TARGET = "en";

	if (typeof(chrome) !== "undefined" && typeof(chrome.storage) != "undefined")
		chrome.storage.sync.get({translate_text: TRANSLATE_TEXT, undo_text: UNDO_TEXT, target_language: TARGET}, items => {
			TRANSLATE_TEXT = items.translate_text;
			UNDO_TEXT = items.undo_text;
			TARGET = items.target_language;
			window.addEventListener("load", inject);
		});
	else
		inject();

	/* Functions */
	// Inject as soon as the comment section was loaded
	function inject () {
		let comments = document.querySelector(QS_COMMENTS);

		if (comments == null) setTimeout(inject, 50);
		else addSectionListener(comments);
	}

	// Listen for new Comments
	function addSectionListener(section, isReply = false) {
		section.addEventListener("DOMNodeInserted", (event) => {
			if (event.relatedNode != section || !(event.target instanceof HTMLElement))
				return;

			setTimeout(() => {
				let main = event.target.querySelector(isReply ? QS_REPLY_MAIN : QS_COMMENT_MAIN);
				let replies = event.target.querySelector(QS_REPLIES_RENDERER);

				let oldTb = main.querySelector(QS_TRANSLATE_BUTTON);
				if (oldTb != null) oldTb.parentNode.removeChild(oldTb);

				main.querySelector(QS_BUTTON_CONTAINER).appendChild(TranslateButton(main));

				if (isReply || replies == null) return;
				addSectionListener(replies.querySelector(QS_LOADED_REPLIES), true);
			}, 10);
		});
	}
})();
