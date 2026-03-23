import { http, HttpResponse } from 'msw'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

// ===== MOCK DATA =====
const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token: 'mock_access_token',
    expires: 999999,
    refresh_token: 'mock_refresh_token',
    expires_refresh_token: 86400000,
    user: {
      _id: '636f935e5fdc5f037e6f68d3',
      roles: ['User'],
      email: 'd3@gmail.com',
      createdAt: '2022-11-12T12:36:46.282Z',
      updatedAt: '2022-12-02T07:57:45.069Z',
      avatar: 'avatar.png',
      name: 'Dư Thanh Được'
    }
  }
}

const refreshTokenRes = {
  message: 'Refresh Token thành công',
  data: {
    access_token: 'new_mock_access_token'
  }
}

// ===== HANDLERS =====
const loginRequest = http.post(`${config.baseUrl}login`, async () => {
  return HttpResponse.json(loginRes, {
    status: HttpStatusCode.Ok
  })
})

const refreshTokenRequest = http.post(`${config.baseUrl}refresh-access-token`, async () => {
  return HttpResponse.json(refreshTokenRes, {
    status: HttpStatusCode.Ok
  })
})

// ===== EXPORT =====
const authRequests = [loginRequest, refreshTokenRequest]

export default authRequests
export const access_token_1s = 'Bearer ...'
