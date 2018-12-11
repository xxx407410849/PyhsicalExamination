module.exports = {
    plugins: [
        require('postcss-inline-svg')({
         removeFill: false
        }),
        require('postcss-pxtorem')(),
        require('autoprefixer')({browsers: ['last 15 versions']})
    ]
};