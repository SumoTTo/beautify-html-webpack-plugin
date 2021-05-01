# HTML Beautifier plugin for Webpack

[Webpack](https://github.com/webpack/webpack#readme) plugin for beautify HTML files (created
using [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin#readme))
using [JS Beautifier](https://github.com/beautify-web/js-beautify#readme).

## Installation

The plugin requires your application to be installed Webpack 4 or 5, and HTML Webpack Plugin 4 or 5.

You can install the package as follows:

```sh
npm install @sumotto/beautify-html-webpack-plugin --save-dev

# or

yarn add @sumotto/beautify-html-webpack-plugin --dev
```

## Usage

Require the plugin in your Webpack config:

```js
const BeautifyHtmlWebpackPlugin = require( '@sumotto/beautify-html-webpack-plugin' );

// or

import BeautifyHtmlWebpackPlugin from '@sumotto/beautify-html-webpack-plugin';
```

Add the plugin to your webpack configuration's `plugins` array after Html Webpack Plugin:

```js
plugins: [
	new HtmlWebpackPlugin(),
	new BeautifyHtmlWebpackPlugin(),
]
```

Configure the parameters you need by passing
[the settings object for JS Beautifier](https://github.com/beautify-web/js-beautify#css--html). By default, the plugin
uses [default settings](https://github.com/beautify-web/js-beautify/blob/main/js/config/defaults.json) from JS
Beautifier:

```js
plugins: [
	new HtmlWebpackPlugin(),
	new BeautifyHtmlWebpackPlugin( {
		"indent_size": 4,
		"indent_char": " ",
		"indent_level": 0,
		"indent_with_tabs": false,
		"preserve_newlines": true,
		"max_preserve_newlines": 10,
		"jslint_happy": false,
		"space_after_named_function": false,
		"space_after_anon_function": false,
		"brace_style": "collapse",
		"keep_array_indentation": false,
		"keep_function_indentation": false,
		"space_before_conditional": true,
		"break_chained_methods": false,
		"eval_code": false,
		"unescape_strings": false,
		"wrap_line_length": 0,
		"indent_empty_lines": false,
		"templating": [ "auto" ]
	} ),
]
```

## Notes

The plugin inside is trying to require HTML WebPack Plugin from your dependencies `require( 'html-webpack-plugin' )`, if
for some reason you connect it from another location, you can transfer it to the second parameter:

```js
plugins: [
	new HtmlWebpackPlugin(),
	new BeautifyHtmlWebpackPlugin( {}, HtmlWebpackPlugin ),
]
```

## License

MIT License
