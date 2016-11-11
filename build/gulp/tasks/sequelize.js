/* eslint-disable no-process-env */
import sequelizeTestSetup from 'gulp-sequelize-test-setup';
import dotenv from 'dotenv-safe';
import path from 'path';
import Connection from 'sequelize-connect';

dotenv.load({
  path: path.join(__dirname, '../../../.env'),
  silent: true
});

const sequelizeTasks = gulp => {
  gulp.task('test:setup', () => {
    new Connection(
      process.env.POSTGRES_DB,
      process.env.POSTGRES_USER,
      process.env.POSTGRES_PWD,
      {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        }
      },
      [path.join(__dirname, '../../../src/app/server/models')]
    ).then(instance => {
      gulp.src('test/fixtures/**/*', {read: false})
        .pipe(sequelizeTestSetup({
          sequelize: instance.sequelize,
          models: instance.models,
          migrationsPath: 'migrations'
        }));
    });
  });
};

export default sequelizeTasks;
