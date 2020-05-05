module.exports = {
  apps : [{
    name: 'dw_web_client',
    script: './server.js',

    args: '',
    instances: 1,
    autorestart: true,
    restart_delay: 2000,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
