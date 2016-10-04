var wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({
  entryPatterns: [
    'config/spec-bundle.js',
    'src/**/*spec.js'
  ],

  module: {
    loaders: [
      {test: /\.css$/, loader: 'raw-loader'},
      {test: /\.html$/, loader: 'raw-loader'},
      {test: /karma-require/, loader: 'null'},
      { test: /\.jade$/, loader: 'pug-html-loader' },
      {test: /\.(scss|sass)$/, loader: 'null'},
      {test: /\.json$/, loader: 'json-loader'},
    ]
  }
});

module.exports = function () {

  return {
    files: [
      {pattern: 'config/spec-bundle.js', load: false},
      {pattern: 'config/karma-require.js', load: false},
      {pattern: 'src/**/*.ts', load: false},
      {pattern: 'src/**/*.css', load: false},
      {pattern: 'src/**/*.html', load: false},
      {pattern: 'src/**/*.jade', load: false},
      {pattern: 'src/**/*.json', load: false},
      {pattern: 'src/**/*.sass', load: false},
      {pattern: 'src/**/*.scss', load: false},
      {pattern: 'src/**/*spec.ts', ignore: true},
      {pattern: 'src/**/*.d.ts', ignore: true}
    ],

    tests: [
      {pattern: 'src/**/*spec.ts', load: false},
      {pattern: 'test/**/*spec.ts', load: false}
    ],

    testFramework: 'jasmine',

    env: {
      runner: require('phantomjs-prebuilt').path,
      params: { runner: '--web-security=false' }
    },

    postprocessor: webpackPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
