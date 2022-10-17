(function main () {
	function ReplaceNode(targetNode, newNode) {
		// for some reason, using any replace method including the old method removes all children and adds the attribute "is-empty", creating a bug similarly mentioned in issue #4, so a workaround is to just replace all the text instead
		// check if newnode has children
		if (newNode.hasChildNodes()) {
			for (let i = 0; i < targetNode.children.length; i++) {
				targetNode.children[i].textContent = newNode.children[i].textContent;
			}
		}
		else {
			targetNode.textContent = newNode.textContent;
		}
	}

	function TranslateButton_SetState() {
		if (this._translated === true) {
			ReplaceNode(this._cRef, this._otext);
			this.innerText = TRANSLATE_TEXT;
		} else {
			ReplaceNode(this._cRef, this._ntext);
			this.innerText = UNDO_TEXT;
		}

		this._translated = !this._translated;
	}

	function TranslateButton_Translate() {
		this.onclick = TranslateButton_SetState;
		
		if (this._otext.children.length === 0) {
			fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${TARGET}&dt=t&q=${encodeURIComponent(this._otext.textContent)}`)
			.then(response => response.json()).then(json => {
				for (let i = 0; i < json[0].length; i++) this._ntext.textContent += json[0][i][0].replace('\n', ' ');
				this.onclick();
			});
		}
		else {
			let text = [];
			for (let i = 0; i < this._otext.children.length; i++) {
				if (this._otext.children[i].textContent !== '' && this._otext.children[i].textContent !== '\n' && this._otext.children[i].textContent !== '\r') {
					text.push(encodeURIComponent(this._otext.children[i].textContent));
				}
			}
			fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${TARGET}&dt=t&q=${text.join('%0A')}`)
			.then(response => response.json()).then(json => {
				let j = 0;
				for (let i = 0; i < this._otext.children.length; i++) {
					if (this._ntext.children[i].textContent !== '' && this._ntext.children[i].textContent !== '\n' && this._ntext.children[i].textContent !== '\r') {
						this._ntext.children[i].textContent = json[0][j][0].replace('\n', ' ');
						j++;
						if (j >= json[0].length) {
							console.log("Out of bounds!");
							console.log(json[0][j-1][0]);
							console.log(this._ntext.children[i].textContent);

							break;
						}
					}
				}
				this.onclick();
			});
		}
	}

	function ResetTranslateButton(tb) {
		if (tb._translated === true) ReplaceNode(tb._cRef, tb._otext);

		//dispose of _ntext
		tb._translated = false;
		tb._ntext = tb._otext.cloneNode(true);
		tb.innerText = TRANSLATE_TEXT;
		tb.onclick = TranslateButton_Translate;
	}

	function TranslateButton(main) {
		let tb = document.createElement("a");
		tb.id = "translate-button";
		tb.style = "margin-left: 5px";
		tb.classList = "yt-simple-endpoint style-scope yt-formatted-string";

		tb._cRef = main.querySelector(QS_CONTENT_TEXT);
		tb._otext = tb._cRef.cloneNode(true);


		/*tb._ntext = document.createElement("div");
		tb._ntext.style.whiteSpace = "pre-wrap";
		tb._ntext.id = "content-text";
		tb._ntext.classList = "style-scope ytd-comment-renderer translate-text yt-formatted-string";*/


		ResetTranslateButton(tb);
		return tb;
	}

	/* Query Selectors */
	// From main
	const QS_BUTTON_FILTER = ".item.style-scope.yt-dropdown-menu";
	const QS_TRANSLATE_BUTTON = "#header>#header-author>yt-formatted-string>#translate-button";
	const QS_CONTENT_TEXT = "#expander>#content>#content-text";
	const QS_BUTTON_CONTAINER = "#header>#header-author>yt-formatted-string";

	/* User settings */
	var TRANSLATE_TEXT = "translate", UNDO_TEXT = "undo", TARGET = navigator.language || navigator.userLanguage;

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
				/*if (mut.target.tagName.toLowerCase() == "ytd-comments") {
					commentObserver.disconnect();
					commentObserver.observe(mut.target, observerConfig);
				} else */
				if (mut.target.id == "contents") {
					for (let n of mut.addedNodes) {
						let main = n.querySelector("#body>#main");
						if (!main) continue;

						let tb = main.querySelector(QS_TRANSLATE_BUTTON);
						if (tb != null) {
							ResetTranslateButton(tb);
						} else {
							main.querySelector(QS_BUTTON_CONTAINER).appendChild(TranslateButton(main));
						}
					}
				}
			}
		});

		commentObserver.observe(document, observerConfig);

		// reset the translate buttons when user changes the comment sorting filter
		document.addEventListener("click", e => {
			if (e.target.matches(QS_BUTTON_FILTER)) {
				setTimeout(() => {
					for (let n of document.querySelectorAll(QS_TRANSLATE_BUTTON)) {
						ResetTranslateButton(n);
					}
				}, 100);
			}
		});
	}
})();