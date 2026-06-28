module.exports = {
  apps: [
    {
      name: "canvas-server",
      cwd: "./apps/server",
      script: "dist/index.js",
      node_args: "--experimental-specifier-resolution=node",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "512M",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      merge_logs: true,
      time: true,
    },
  ],
};
