'use strict';

const utils = require( './utils.js' );

// TODO: Support `new mw.Message( store, key )` syntax
const methodNames = [ 'msg', 'message', 'deferMsg' ];

module.exports = {
	meta: {
		docs: {
			description: 'Ensures message keys are documented when they are constructed.'
		},
		schema: []
	},

	create: function ( context ) {

		return {
			CallExpression: function ( node ) {
				if (
					node.callee.type !== 'MemberExpression' ||
					!methodNames.includes( node.callee.property.name ) ||
					!node.arguments.length
				) {
					return;
				}

				if ( utils.requiresCommentList( context, node ) ) {
					context.report( {
						node: node,
						message: 'All possible message keys should be documented'
						// TODO: Link to documentation page
					} );
				}
			}
		};
	}
};
