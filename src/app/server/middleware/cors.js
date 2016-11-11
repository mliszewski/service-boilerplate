import cors from 'cors';

const corsMiddleware = app => {
  app.use(cors());
};

export default corsMiddleware;
