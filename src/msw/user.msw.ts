import { http, HttpResponse } from 'msw'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { access_token_1s } from './auth.msw'

// ===== MOCK DATA =====
const meRes = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '636f935e5fdc5f037e6f68d3',
    roles: ['User'],
    email: 'd3@gmail.com',
    createdAt: '2022-11-12T12:36:46.282Z',
    updatedAt: '2022-12-02T07:57:45.069Z',
    avatar: 'avatar.png',
    name: 'vu hoang'
  }
}

// ===== HANDLER =====
const meRequest = http.get(`${config.baseUrl}me`, ({ request }) => {
  const access_token = request.headers.get('authorization')

  if (access_token === access_token_1s) {
    return HttpResponse.json(
      {
        message: 'Lỗi',
        data: {
          message: 'Token hết hạn',
          name: 'EXPIRED_TOKEN'
        }
      },
      {
        status: HttpStatusCode.Unauthorized
      }
    )
  }

  return HttpResponse.json(meRes, {
    status: HttpStatusCode.Ok
  })
})

// ===== EXPORT =====
const userRequests = [meRequest]

export default userRequests
