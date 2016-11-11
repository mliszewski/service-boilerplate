import cfg from './config';

const tasks = (gulp, plugins) => {
  // Register all tasks dynamically
  require('./tasks').default(gulp, plugins, cfg); // eslint-disable-line global-require

  // Expose 'public' tasks
  gulp.task('lint', plugins.sequence(['eslint']));
  gulp.task('dev', plugins.sequence('lint', ['nodemon']));

  // Define default (what the build server will run)
  gulp.task('default', plugins.sequence('test'));
};

export default tasks;
