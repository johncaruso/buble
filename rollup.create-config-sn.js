// import buble from './rollup-plugin-buble-sn';
import buble from 'rollup-plugin-buble';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import postprocess from 'rollup-plugin-postprocess';

const ensureArray = maybeArr => Array.isArray(maybeArr) ? maybeArr : [maybeArr];

const createConfigSN = (opts) => {
	opts = opts || {};
	const browser = opts.browser || false;
	const external = opts.external || Object.keys(pkg.dependencies || {}).filter(dep => !dep.match(/^acorn/));
	const output = ensureArray(opts.output);

	return {
		input: 'src/index.js',
		output: output.map(format => Object.assign({}, format, {
			name: 'buble',
			sourcemap: true
		})),
		external: external,
		plugins: [
			json(),
			commonjs({ extensions: ['.js', '.mjs'] }),
			buble({
				// target: !browser ? { node: 4 } : null,
				target: null,
				include: [
					'src/**' //,
					// 'node_modules/acorn-jsx/**'
				],
				transforms: {
					dangerousForOf: true
				}
			}),
			resolve(),
			postprocess([
				[/([a-zA-Z_$][0-9a-zA-Z_$]*)\.(abstract|boolean|byte|char|class|double|enum|export|extends|final|float|goto|implements|import|int|interface|long|native|package|private|protected|public|short|static|super|synchronized|throws|transient|volatile|break|case|catch|continue|debugger|default|do|else|finally|for|function|if|return|switch|throw|try|var|while|with|null|true|false|instanceof|typeof|void|delete|new|in|this|const)([^0-9a-zA-Z_$]+|$)/,
					function(match, p1, p2, p3) {
						return p1 + "['" + p2 + "']" + p3;
					}] //,
				// [
				// 	/([$A-Z_][0-9A-Z_$]*)\.__proto__\s?=\s?([$A-Z_][0-9A-Z_$]*)/,
				// 	'Object.setPrototypeOf( $1, $2 )'
				// ]
			])
		],
	};
};

export default createConfigSN;