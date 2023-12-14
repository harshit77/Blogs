/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    webpack:(config,{webpack})=>{
        config.plugins.push(
            new webpack.DefinePlugin({
                 'process.env.FLUENTFFMPEG_COV': false
            })
        )
        return config
    }
}

module.exports = nextConfig
