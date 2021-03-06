module.exports = exports = function(lasso, config) {
    lasso.dependencies.registerRequireType(
        'foo',
        {
            properties: {
                'path': 'string'
            },

            async init (lassoContext) {
                if (!this.path) {
                    throw new Error('"path" is required for a Marko dependency');
                }

                this.path = this.resolvePath(this.path);
            },

            object: true, // We are exporting a simple JavaScript object

            read (lassoContext) {
                return new Promise((resolve) => {
                    setTimeout(function() {
                        resolve(JSON.stringify({foo: 'bar'}));
                    });
                });
            },

            async getLastModified (lassoContext) {
                return lassoContext.getFileLastModified(this.path);
            }
        });
};
