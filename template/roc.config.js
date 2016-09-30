module.exports = {
  settings: {
    runtime: {
      applicationName: '{{ title }}',
      port: {{ port }},
      serve: ['public', 'build/client'],
      favicon: 'favicon.png',
    },
    build: {
      reducers: 'src/reducers/reducers.ts',
      routes: 'src/routes/index.tsx',
    },
    test: {
      web: {
        src: {
          pattern: /^((?!\.(test|d)\.).)*tsx?$/,
        },
        tests: {
          path: 'src',
          pattern: /\.test\.tsx?$/,
        },
      },
    },
  },
};
