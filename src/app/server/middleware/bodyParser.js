import bodyParser from 'body-parser';

const bodyParseMiddleware = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
};

export default bodyParseMiddleware;
