# YouTube-Comment-Translate

<!-- vim-markdown-toc GFM -->

* [Usage](#usage)
	* [Changing the language](#changing-the-language)
* [Installation](#installation)
	* [Javascript injector](#javascript-injector)
	* [Chromium Browsers](#chromium-browsers)
	* [Other Browsers](#other-browsers)
		* [Firefox](#firefox)
* [Changelog](#changelog)

<!-- vim-markdown-toc -->

## Usage
<img src="docs/usage.gif">

### Changing the language
The default language is english (en). To change it, open `inject.js` in a text editor and change line 5 (`TARGET_LANGUAGE`) to be the desired language.
[But what letters should I set it to?](https://www.gnu.org/software/gettext/manual/html_node/Usual-Language-Codes.html)

## Installation
[Download](../../releases/latest/) and extract the newest release.

### Javascript injector
Since this script was made to be injected from the browsers developer console. One can simply use a [Javascript injector](https://github.com/Lor-Saba/Code-Injector). This is also the recommended method for firefox users.
Use this pattern
<img src="docs/injector.png">
`www\.youtube\.com`

### Chromium Browsers

Open the following url in your browser
<table>
	<tr>
		<td align="right"><b>Browser</b></td>
		<td align="center"><img src="https://github.com/PapirusDevelopmentTeam/papirus-icon-theme/blob/master/Papirus/48x48/apps/chromium-browser.svg" title="Chromium"></td>
		<td align="center"><img src="https://github.com/PapirusDevelopmentTeam/papirus-icon-theme/blob/master/Papirus/48x48/apps/google-chrome.svg" title="Chrome"></td>
		<td align="center"><img src="https://github.com/PapirusDevelopmentTeam/papirus-icon-theme/blob/master/Papirus/48x48/apps/opera.svg" title="Opera"></td>
		<td align="center"><img src="https://github.com/PapirusDevelopmentTeam/papirus-icon-theme/blob/master/Papirus/48x48/apps/brave.svg" title="Brave"></td>
		<td align="center"><img src="https://github.com/PapirusDevelopmentTeam/papirus-icon-theme/blob/master/Papirus/48x48/apps/vivaldi.svg" title="Brave"></td>
	</tr>
	<tr>
		<td align="right"><b>Url</b></td>
		<td align="center">chrome://extensions</td>
		<td align="center">chrome://extensions</td>
		<td align="center">opera:extensions</td>
		<td align="center">chrome://extensions</td>
		<td align="center">vivaldi://extensions</td>
	</tr>
</table>

---

Enable `Developer mode` and click on `Load unpacked`.
Navigate to the folder you extracted to and click `open`. Disable `Developer mode`.

### Other Browsers

#### Firefox
<img src="https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/48x48/apps/firefox.svg">

Use any javascript injector and paste `inject.js` into it.

## Changelog
[Click here](docs/CHANGELOG.md)

---

The icons used in the README are from the open-source [papirus-icon-theme](https://github.com/PapirusDevelopmentTeam/papirus-icon-theme) project
