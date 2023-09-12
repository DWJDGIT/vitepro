import axios from '@/utils/index'

export function getUserInfo() {
  return axios.get({
    url: `/`,
  })
}
