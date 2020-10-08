//配置别名
module.exports={
    configureWebpack: {
        resolve: {
            extensions:[],
            alias : {
                'assets' : '@/assets',
                'common' : '@/common',
                'components' : '@/components',
                'network' : '@/network',
                'views' : '@/views',
            }
        }
    }
}
