import { transform } from './src/index';
import { createFilter } from 'rollup-pluginutils';

export default function buble ( options ) {
	if ( !options ) options = {};
	const filter = createFilter( options.include, options.exclude );

	if ( !options.transforms ) options.transforms = {};
	options.transforms.modules = false;

	return {
		name: 'buble',

		transform: function ( code, id ) {
			if ( !filter( id ) ) return null;

			try {
				return transform( code, options );
			} catch (e) {
				e.plugin = 'buble';
				if ( !e.loc ) e.loc = {};
				e.loc.file = id;
				e.frame = e.snippet;
				throw e;
			}
		}
	};
}