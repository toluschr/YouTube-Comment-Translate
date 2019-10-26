(function main () {
	/* User settings */
	const TRANSLATE_TEXT = "translate";
	const UNDO_TEXT = "undo";
	const TARGET_LANGUAGE = "en";
	const URL = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" + TARGET_LANGUAGE + "&dt=t&q=";

	/* Query Selectors */
	// From document
	const QS_COMMENTS = "ytd-comments>ytd-item-section-renderer>div#contents";
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
	(function inject () {
		let comments = document.querySelector(QS_COMMENTS);

		if (comments == null) {
			setTimeout(() => { inject(); }, 50);
			return;
		}

		addSectionListener(comments);
	})(); // Immediately call this function

	// Listen for new Comments
	function addSectionListener(section, isReply = false) {
		section.addEventListener("DOMNodeInserted", (event) => {
			if (event.relatedNode != section) return;

			setTimeout(() => { CommentThreadRenderer_AddTranslateButtons(event.target, isReply); }, 1);
		});
	}

	// New Translate Button
	function TranslateButton (main) {
		this.DOM = document.createElement("a");
		this.DOM.classList = "yt-simple-endpoint style-scope yt-formatted-string";
		this.DOM.id = "translate-button";
		this.DOM.style = "margin-left: 5px";
		this.DOM_Text = main.querySelector(QS_CONTENT_TEXT);
		this.originalHTML = this.DOM_Text.innerText; // This isn't an issue
		this.newText = "";

		TranslateButton_SetState(this);
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
	function TranslateButton_Translate (tb) {
		if (tb.newText.length == 0) {
			let req = new XMLHttpRequest();
			
			req.open("GET", URL + encodeURI(tb.DOM_Text.innerText), false);
			req.send();

			let json = JSON.parse(req.responseText)[0];
			for (let i = 0; i < json.length; i++) {
				tb.newText += json[i][0];
			}
		}
		TranslateButton_SetState(tb);
	}

	// Add Buttons to Comment Thread (And comments)
	function CommentThreadRenderer_AddTranslateButtons (commentThreadRenderer, isReply) {
		let main = commentThreadRenderer.querySelector(isReply ? QS_REPLY_MAIN : QS_COMMENT_MAIN);
		let repliesRenderer = commentThreadRenderer.querySelector(QS_REPLIES_RENDERER);
		
		if (main.querySelector(QS_TRANSLATE_BUTTON) == null) new TranslateButton(main);

		if (isReply || repliesRenderer == null) return;
		addSectionListener(repliesRenderer.querySelector(QS_LOADED_REPLIES), true);
	}
})();
