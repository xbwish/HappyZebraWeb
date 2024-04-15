module.exports = {
    apps: [{
        name: 'coreshop-h5',
        exec_mode: 'fork',
        instances: '1',
        script: './server/index.mjs',
        watch: true,
        env: {
            PORT: 3000,
            HOST: "0.0.0.0"
        }
    }]
}