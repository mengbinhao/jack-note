'use strict';

let ghpages = require('gh-pages');

function main() {
    ghpages.publish('./gh-pages', console.error.bind(console));
}

main();