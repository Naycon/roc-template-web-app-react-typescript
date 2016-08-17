module.exports = {
  settings: {
    runtime: {
      applicationName: '{{ rocTitleName }}',
      port: {{ rocPort }},
      serve: ['public', 'build/client'],
      favicon: 'favicon.png',
    },
    build: {
      reducers: 'src/redux/reducers.ts',
      routes: 'src/routes/index.tsx',
    },
  },
};
