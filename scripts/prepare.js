const path = require( 'path' );
const fs = require( 'fs' );

const webpackPath = path.resolve( 'node_modules', 'webpack' );
const htmlWebpackPluginPath = path.resolve( 'node_modules', 'html-webpack-plugin' );
const htmlWebpackPlugin4Path = path.resolve( 'node_modules', 'html-webpack-plugin-4' );
const terserWebpackPluginPath = path.resolve( 'node_modules', 'terser-webpack-plugin' );

// Removed peerDependencies
if ( fs.existsSync( webpackPath ) ) {
	fs.rmdirSync( webpackPath, { recursive: true } );
}

if ( fs.existsSync( htmlWebpackPluginPath ) ) {
	fs.rmdirSync( htmlWebpackPluginPath, { recursive: true } );
}

const pathsForFix = [
	// Fix getting the webpack version in html-webpack-plugin-4
	path.join( htmlWebpackPlugin4Path, 'index.js' ),
	path.join( htmlWebpackPlugin4Path, 'lib/child-compiler.js' ),
	path.join( htmlWebpackPlugin4Path, 'lib/file-watcher-api.js' ),
	// Fix getting the webpack version in terser-webpack-plugin
	path.join( terserWebpackPluginPath, 'dist/index.js' ),
];

pathsForFix.forEach( function( pathForFix ) {
	if ( fs.existsSync( pathForFix ) ) {
		const oldData = fs.readFileSync( pathForFix ).toString();
		const newData = oldData.replace( /webpack\//g, 'webpack-4/' );

		fs.writeFileSync( pathForFix, newData );
	}
} );

// eslint-disable-next-line no-console
console.log( 'prepare.js - Done' );
