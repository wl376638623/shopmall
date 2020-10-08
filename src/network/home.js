import {request} from './request'

export function getHomeMutidata() {
  return request({
    url: '/home/multidata'
  })
}
