# YouTube-Comment-Translate

* [Usage](#usage)
	* [Changing the language](#changing-the-language)
* [Installation](#installation)
	* [Cross Browsers](#cross-browsers)
		* [Javascript injector](#javascript-injector)
	* [Chromium Browsers](#chromium-browsers)
		* [Chrome, Chromium](#chrome-chromium)
		* [Opera](#opera)
	* [Other Browsers](#other-browsers)
		* [Firefox](#firefox)
* [Changelog](#changelog)

## Usage
![Usage](docs/usage.gif)

### Changing the language
The default language is english (en). To change it, open `inject.js` in a text editor and change line 5 (`TARGET_LANGUAGE`) to be the desired language.
[But what letters should I set it to?](https://www.gnu.org/software/gettext/manual/html_node/Usual-Language-Codes.html)

## Installation
[Download](../../releases/latest/) and extract the newest release.

### Cross Browsers
#### Javascript injector
Since this script was made to be injected from the browsers developer console. One can simply use a [Javascript injector](https://github.com/Lor-Saba/Code-Injector). This is also the recommended method for firefox users.
`www\.youtube\.com\/watch\?v=.*|www\.youtube\.com\/channel\/.*\/community.*`

### Chromium Browsers

#### Chrome, Chromium
Go to chrome://extensions/.

#### Opera
Go to opera:extensions.

---

Enable `Developer mode` and click on `Load unpacked`.
Navigate to the folder you extracted to and click `open`. Disable `Developer mode`.

### Other Browsers

#### Firefox
Use any javascript injector and paste `inject.js` into it.
![Screenshot](docs/firefox.png?raw=true)

## Changelog
[Click here](docs/CHANGELOG.md)
