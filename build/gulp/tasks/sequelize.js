/* eslint-disable no-process-env */
import sequelizeTestSetup from 'gulp-sequelize-test-setup';
import dotenv from 'dotenv-safe';
import path from 'path';
import Connection from 'sequelize-connect';

dotenv.load({
  path: path.join(__dirname, '../../../.env'),
  silent: true
});


const testDatabase = process.env.POSTGRES_DB;
const gulpDB = require('gulp-db')({
  host: process.env.POSTGRES_HOST,
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PWD,
  dialect: 'postgres',
  database: 'core'
}); // eslint-disable-line global-require

const sequelizeTasks = (gulp, plugins, cfg) => {
  gulp.task('testdb:create', gulpDB.create(testDatabase));
  gulp.task('testdb:migrate', () => {
    new Connection(
      testDatabase,
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
      [path.join(__dirname, '../../../src/app/server/models')],
      file => path.extname(file) === '.js'
    ).then(instance => {
      gulp.src('test/fixtures/**/*', {read: false})
        .pipe(sequelizeTestSetup({
          sequelize: instance.sequelize,
          models: instance.models,
          migrationsPath: 'migrations'
        }))
        .on('end', () => {
          pg.query(`DROP DATABASE ${testDatabase};`);
        });
    });
  });
  gulp.task('testdb:drop', gulpDB.drop(testDatabase));
  gulp.task('testdb:setup', plugins.sequence('testdb:drop', 'testdb:create', 'testdb:migrate'));
};

export default sequelizeTasks;
