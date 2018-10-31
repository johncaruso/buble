// import createConfig from './rollup.create-config';
import createConfigSN from './rollup.create-config-sn';
import pkg from './package.json';

const configs = [
	createConfigSN({
		browser: true,
		external: [],
		output: [
			{ format: 'iife', file: pkg.browser['sn'] },
			{ format: 'es', file: pkg.module },
			{ format: 'iife', file: pkg.main }
			// { format: 'cjs', file: pkg.main }
		],
	})
];

export default configs;
