<p align="center"><img src="docs/icon.png"></p>
<h1 align="center">YouTube-Comment-Translate</h1>

<p align="center">
	</br></br>
		<a href="https://chrome.google.com/webstore/detail/youtube-comment-translate/alaejlmlpgcffloicejpccebbeeibemo">
			<img src="docs/ChromeWebStore_BadgeWBorder_v2_206x58.png">
	</br></br>
</p>

* [Usage](#usage)
    * [Changing the language](#changing-the-language)
* [Installation](#installation)
* [Manual Install](#manual-install)
    * [Javascript injector](#javascript-injector)
    * [Chromium](#chromium)
    * [Other](#other)

## Usage

Reload any open YouTube page after installation. A translate button will then appear in the header of every comment. </br>

<img src="docs/usage.gif">

### Changing the language

By default, the extension translates to english (en). If the extension was
installed from the crhome webstore, this can be configured by changing the Traget
Language in the settings here: `chrome://extensions/?options=alaejlmlpgcffloicejpccebbeeibemo`.

When using a JavaScript injector as the installation method, manually edit
`inject.js` and change line 5 (`TARGET_LANGUAGE`) to the desired language.

A list of supported languages can be found here: <https://www.gnu.org/software/gettext/manual/html_node/Usual-Language-Codes.html>

## Installation

When using chrome or any chromium based browser, it is recommended to install
the extension directly from the chrome webstore.

## Manual Install

### Javascript injector

Since this plugin uses a content-script, it should work on any browser that
supports a [Javascript injector](https://github.com/Lor-Saba/Code-Injector).

This is also the recommended method for firefox users. Use the following url
pattern: `www\.youtube\.com`

<img src="docs/injector.png">

### Chromium

Open the correct url for your browser:

<table>
	<tr>
		<td align="right"><b>Browser</b></td>
		<td align="center"><img src="https://raw.github.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/48x48/apps/chromium-browser.svg" title="Chromium"></td>
		<td align="center"><img src="https://raw.github.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/48x48/apps/google-chrome.svg" title="Chrome"></td>
		<td align="center"><img src="https://raw.github.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/48x48/apps/opera.svg" title="Opera"></td>
		<td align="center"><img src="https://raw.github.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/48x48/apps/brave.svg" title="Brave"></td>
		<td align="center"><img src="https://raw.github.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/48x48/apps/vivaldi.svg" title="Brave"></td>
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

### Other

<table>
	<tr>
		<td align="right"><b>Browser</b></td>
		<td align="center"><img src="https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/48x48/apps/firefox.svg" title="Firefox"></td>
		<td align="center"><img src="https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/48x48/apps/icecat.svg" title="IceCat"></td>
		<td align="center"><img src="https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/48x48/apps/waterfox.svg" title="Waterfox"></td>
		<td align="center"><img src="https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/48x48/apps/iceweasel.svg" title="IceWeasel"></td>
	</tr>
	<tr>
		<td align="right"><b>Install</b></td>
		<td align="center">JavaScript Injector</td>
		<td align="center">JavaScript Injector</td>
		<td align="center">JavaScript Injector</td>
		<td align="center">JavaScript Injector</td>
	</tr>
</table>

---

The icons used in the README are from the open-source [papirus-icon-theme](https://github.com/PapirusDevelopmentTeam/papirus-icon-theme) project
