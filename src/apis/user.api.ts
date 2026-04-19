import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>('user', body)
  },
  uploadAvatar(body: FormData) {
    // Không set Content-Type thủ công: axios/browser sẽ gửi multipart kèm boundary đúng.
    // Gửi `multipart/form-data` không có boundary khiến server không đọc được file.
    return http.post<SuccessResponse<string>>('user/upload-avatar', body)
  }
}

export default userApi
