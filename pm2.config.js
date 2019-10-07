module.exports = {
  apps: [{
    name: 'placements-teaser',
    script: './InvoiceServer/server/index.js',
    instances: 1,
    autorestart: true,
    max_memory_restart: '512M'
  }]
};
