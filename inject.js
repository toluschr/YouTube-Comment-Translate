(function main () {
	/* User settings */
	const TRANSLATE_TEXT = "translate";
	const UNDO_TEXT = "undo";
	const TARGET_LANGUAGE = "en";
	const URL = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" + TARGET_LANGUAGE + "&dt=t&q=";

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

	/* Functions */
	// Inject as soon as the comment section was loaded
	function inject () {
		let comments = document.querySelector(QS_COMMENTS);

		if (comments == null) setTimeout(inject, 50);
		else addSectionListener(comments);
	}

	window.addEventListener("load", inject);

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
				new TranslateButton(main);

				if (isReply || replies == null) return;
				addSectionListener(replies.querySelector(QS_LOADED_REPLIES), true);
			}, 1);
		});
	}

	// New Translate Button
	function TranslateButton (main) {
		this.DOM = document.createElement("a");
		this.DOM.classList = "yt-simple-endpoint style-scope yt-formatted-string";
		this.DOM.id = "translate-button";
		this.DOM.style = "margin-left: 5px";
		this.DOM_Text = main.querySelector(QS_CONTENT_TEXT);
		this.originalHTML = this.DOM_Text.innerHTML;
		this.newText = "";

		this.DOM.innerText = TRANSLATE_TEXT;
		this.DOM.onclick = () => { TranslateButton_Translate(this); };
		main.querySelector(QS_BUTTON_CONTAINER).appendChild(this.DOM);
	}

	// Set the state
	function TranslateButton_SetState (tb) {
		if (tb.DOM.innerText != TRANSLATE_TEXT) {
			tb.DOM_Text.innerHTML = tb.originalHTML;
			tb.DOM.innerText = TRANSLATE_TEXT;
			tb.DOM.onclick = () => { TranslateButton_Translate(tb); };
		}
		else {
			tb.DOM_Text.innerText = tb.newText;
			tb.DOM.innerText = UNDO_TEXT;
			tb.DOM.onclick = () => { TranslateButton_SetState(tb); };
		}
	}

	// Actual Code to translate
	async function TranslateButton_Translate (tb) {
		if (tb.newText.length == 0) {
			await fetch(URL + encodeURI(tb.DOM_Text.innerText))
				.then(response => response.json())
				.then(json => {
					for (let i = 0; i < json[0].length; i++)
						tb.newText += json[0][i][0];
				});
		}
		TranslateButton_SetState(tb);
	}
})();
