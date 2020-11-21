const gulp = require(`gulp`);
const plumber = require(`gulp-plumber`);
const sourcemaps = require(`gulp-sourcemaps`);
const rollup = require(`gulp-better-rollup`);
const resolve = require(`rollup-plugin-node-resolve`);
const commonjs = require(`rollup-plugin-commonjs`);
const babel = require(`rollup-plugin-babel`);
const uglify = require(`gulp-uglify`);



gulp.task(`build`, () => {
  return gulp.src(`js/main.js`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rollup({
      plugins: [
        resolve({browser: true}),
        commonjs(),
        babel({
          babelrc: false,
          exclude: `node_modules/**`,
          presets: [`@babel/env`]
        })
      ]
    }, `iife`))
    .pipe(uglify())
    .pipe(sourcemaps.write(``))
    .pipe(gulp.dest(`build/js`));
});
