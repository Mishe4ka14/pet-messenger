const dotenv = require('dotenv');

dotenv.config({ path: './.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: 'dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd /home/mishechka/pet-messenger/current/backend && pwd && npm ci && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};