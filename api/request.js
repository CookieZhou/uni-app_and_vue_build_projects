import { request } from './index'
import modules from './modules'

export const httpRequest = function(key, data = {}) {
    return request({ ...modules[key], data })
}
