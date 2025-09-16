// Karma configuration file
// https://karma-runner.github.io/1.0/config/configuration-file.html

const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    client: {
      jasmine: {
        // Add Jasmine configuration options here
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    jasmineHtmlReporter: {
      suppressAll: true
    },

    coverageReporter: {
      dir: path.join(__dirname, './coverage/flavor-hive-angular'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ],
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 55,
          lines: 80
        },
        each: {
          statements: 70,
          branches: 70,
          functions: 70,
          lines: 70,
          overrides: {
            'src/app/shared/components/confirm-dialog/confirm-dialog.component.ts': {
              statements: 90,
              branches: 90,
              functions: 90,
              lines: 90
            },
            'src/store/**/*.ts': {
              statements: 0,
              branches: 0,
              functions: 0,
              lines: 0
            }
          }
        }
      }
    },

    reporters: ['progress', 'kjhtml'],

    // Use headless Chrome in CI, regular Chrome locally
    browsers: [process.env.CI ? 'ChromeHeadless' : 'Chrome'],

    // CI-friendly timeouts to avoid DISCONNECTED errors
    browserDisconnectTimeout: 100000,
    browserNoActivityTimeout: 120000,
    captureTimeout: 120000,

    restartOnFileChange: true,
    singleRun: !!process.env.CI
  });
};
