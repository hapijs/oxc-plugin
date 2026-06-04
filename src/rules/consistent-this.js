export default {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'enforce consistent naming when capturing the current execution context',
            category: 'Stylistic Issues',
            recommended: true,
        },
        schema: {
            type: 'array',
            items: {
                type: 'string',
                minLength: 1,
            },
            uniqueItems: true,
        },
        messages: {
            aliasNotAssignedToThis: "Designated alias '{{name}}' is not assigned to 'this'.",
            unexpectedAlias: "Unexpected alias '{{name}}' for 'this'.",
        },
    },
    createOnce(context) {
        // Checks that a designated alias is only assigned `this`, and that `this`
        // is only ever assigned to a designated alias. The scope-level check for an
        // alias declared but never assigned `this` (e.g. `let self;`) is omitted —
        // assignment sites cover the hapi pattern `const self = this`.

        const checkAssignment = function (node, name, value) {
            const isThis = value.type === 'ThisExpression';
            const isAlias = context.options.includes(name);

            if (isAlias && (!isThis || (node.operator && node.operator !== '='))) {
                context.report({ node, messageId: 'aliasNotAssignedToThis', data: { name } });
                return;
            }

            if (!isAlias && isThis) {
                context.report({ node, messageId: 'unexpectedAlias', data: { name } });
            }
        };

        return {
            VariableDeclarator(node) {
                const id = node.id;
                const isDestructuring = id.type === 'ArrayPattern' || id.type === 'ObjectPattern';

                if (node.init !== null && !isDestructuring) {
                    checkAssignment(node, id.name, node.init);
                }
            },
            AssignmentExpression(node) {
                if (node.left.type === 'Identifier') {
                    checkAssignment(node, node.left.name, node.right);
                }
            },
        };
    },
};
