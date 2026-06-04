export default {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'require variables to be declared in separate statements',
            category: 'Stylistic Issues',
            recommended: true,
        },
        schema: [
            {
                enum: ['never'],
            },
        ],
        messages: {
            split: "Split '{{type}}' declarations into multiple statements.",
        },
    },
    createOnce(context) {
        const check = function (node) {
            // `never`: each variable must be declared in its own statement.

            if (node.declarations.length > 1) {
                context.report({ node, messageId: 'split', data: { type: node.kind } });
            }
        };

        return {
            VariableDeclaration: check,
        };
    },
};
