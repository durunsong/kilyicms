const bodyParser = require('body-parser');

const bodyParserMiddleware = {
    json: bodyParser.json(),
    urlencoded: bodyParser.urlencoded({ extended: false })
};

module.exports = bodyParserMiddleware;
