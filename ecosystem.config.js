module.exports = {
  apps: [
    {
      name: 'judgecode-api',
      script: './build/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
}
