import Node from '../Node.js';

export default class Literal extends Node {
	transpile () {
		const leading = this.raw.slice( 0, 2 );
		if ( leading === '0b' || leading === '0o' ) {
			this.replaceWith( String( this.value ), true );
		}
	}
}
