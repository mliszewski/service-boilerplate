import cwd from 'cwd';

const eslintTasks = (gulp, plugins, cfg) => {
  // Helper function for determining if a file's lint error/warning was automatically fixed
  const isFixed = file => file.eslint && file.eslint.fixed;

  const eslintTask = (srcFiles, destDir) => (
    gulp.src(srcFiles)
      .pipe(plugins.eslint(cfg.eslint.opts))
      .pipe(plugins.eslint.format())
      .pipe(plugins.if(cfg.env.isVerbose, plugins.debug()))
      .pipe(plugins.if(!cfg.env.isLocal, plugins.eslint.failAfterError()))
      .pipe(plugins.if(cfg.env.isLocal && isFixed, gulp.dest(cwd(`${destDir}/`))))
  );

  gulp.task('eslint:src', () => eslintTask(cfg.eslint.src.src, cfg.dirs.src));
  gulp.task('eslint:build', () => eslintTask(cfg.eslint.src.build, cfg.dirs.build));

  gulp.task('eslint', plugins.sequence('eslint:build', 'eslint:src'));
};

export default eslintTasks;
