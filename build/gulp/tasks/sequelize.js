import sequelizeTestSetup from 'gulp-sequelize-test-setup';
import dotenv from 'dotenv-safe';
import path from 'path';

dotenv.load({
  path: path.join(__dirname, '../../../.env'),
  silent: true
});

const sequelizeTasks = (gulp) => {
  gulp.task('test:setup', () => {
    const models = require('../../../app/server/models').default;
    return gulp.src('test/fixtures/**/*', {read: false})
      .pipe(sequelizeTestSetup({
        sequelize: models.sequelize,
        models: models,
        migrationsPath: 'migrations'
      }));
  });
};

export default sequelizeTasks;
