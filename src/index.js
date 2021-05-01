/* eslint-disable jsdoc/valid-types */
'use strict';

const beautify = require( 'js-beautify' ).html;

class BeautifyHtmlWebpackPlugin {
	/**
	 * @typedef {import('html-webpack-plugin-4')} HtmlWebpackPlugin4
	 * @typedef {import('html-webpack-plugin-5')} HtmlWebpackPlugin5
	 *
	 * @see https://github.com/jantimon/html-webpack-plugin
	 * @see https://github.com/beautify-web/js-beautify
	 *
	 * @param {Object} options HTML Beautifier Options
	 * @param {HtmlWebpackPlugin4|HtmlWebpackPlugin5} HtmlWebpackPlugin
	 */
	constructor( options = {}, HtmlWebpackPlugin ) {
		if ( ! HtmlWebpackPlugin ) {
			// noinspection NpmUsedModulesInstalled
			HtmlWebpackPlugin = require( 'html-webpack-plugin' );
		}

		this.name = 'SumoTTo Beautify Html Webpack Plugin';
		this.HtmlWebpackPlugin = HtmlWebpackPlugin;
		this.options = options;
	}

	beautify( data, cb ) {
		data.html = beautify( data.html, this.options );
		if ( cb ) {
			cb( null, data );
		}
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * @typedef {import('webpack-4').Compiler} WebpackCompiler4
	 * @typedef {import('webpack-5').Compiler} WebpackCompiler5
	 *
	 * @see https://webpack.js.org/api/compiler-hooks/
	 * @see https://webpack.js.org/api/compilation-hooks/
	 * @see https://github.com/jantimon/html-webpack-plugin#events
	 *
	 * @param {WebpackCompiler4|WebpackCompiler5} compiler
	 */
	apply( compiler ) {
		compiler.hooks.compilation.tap( this.name, ( compilation ) => {
			this.HtmlWebpackPlugin.getHooks( compilation ).beforeEmit.tapAsync( this.name, this.beautify.bind( this ) );
		} );
	}
}

module.exports = BeautifyHtmlWebpackPlugin;
