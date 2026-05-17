module.exports = {
  apps: [
    {
      name: "canvas-api",
      script: "./dist/index.js",
      instances: 1,
      exec_mode: "fork",
      env_production: {
        NODE_ENV: "production",
        PORT: 3002,
      },
      error_file: "/var/log/canvas/error.log",
      out_file: "/var/log/canvas/out.log",
      merge_logs: true,
      restart_delay: 3000,
      max_memory_restart: "512M",
    },
  ],
};
