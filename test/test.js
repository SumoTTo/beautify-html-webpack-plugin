const path = require( 'path' );
const fs = require( 'fs' );
const dist = path.join( __dirname, '/dist' );
const testPlugin = require( '../src' );

let webpackConfigErrors;
let webpackStats;

function runWebpack( version ) {
	const testWebpack = require( 'webpack-' + version );
	const testHtmlWebpackPlugin = require( 'html-webpack-plugin-' + version );

	const webpackConfig = {
		target: 'node',
		mode: 'none',
		entry: path.join( __dirname, '/src/main.js' ),
		output: {
			path: dist,
		},
		plugins: [
			new testHtmlWebpackPlugin( {
				template: path.join( __dirname, '/src/index.html' ),
				inject: false,
				minify: false,
				cache: false,
			} ),
			new testPlugin( {}, testHtmlWebpackPlugin ),
		],
	};

	return new Promise( function( resolve ) {
		testWebpack( webpackConfig, function( err, stats ) {
			webpackConfigErrors = err;
			webpackStats = stats;
			if ( webpackConfigErrors ) {
				// eslint-disable-next-line no-console
				console.error( 'webpackConfigErrors', webpackConfigErrors );
			}
			if ( webpackStats.hasErrors() ) {
				// eslint-disable-next-line no-console
				console.error( 'webpackStats', webpackStats.toJson( 'errors-warnings' ) );
			}

			resolve();
		} );
	} );
}

describe.each( [ [ '4' ], [ '5' ] ] )( 'Webpack %s', function( level ) {
	beforeAll( () => runWebpack( level ) );

	test( 'Check fatal webpack errors (wrong configuration, etc)', function() {
		expect( webpackConfigErrors ).toBeNull();
	} );

	test( 'Check compilation errors (missing modules, syntax errors, etc)', function() {
		expect( webpackStats.hasErrors() ).toBeFalsy();
	} );

	test( 'Outputting HTML complies with the reference standard', function() {
		const file = path.join( dist, 'index.html' );
		expect( fs.existsSync( file ) ).toBeTruthy();
		expect( fs.readFileSync( file ).toString() ).toMatchSnapshot();
	} );

	afterAll( function() {
		if ( fs.existsSync( dist ) ) {
			fs.rmdirSync( dist, { recursive: true } );
		}
	} );
} );
