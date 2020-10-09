import {request} from './request'

export function getHomeMutidata() {
  return request({
    url: '/home/multidata'
  })
}
//获取首页数据
export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    params :{
      type,
      page
    }

  })
}
