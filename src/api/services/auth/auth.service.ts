import Cookies from 'js-cookie'

import { saveToStorage, EnumTokens, removeFromStorage, EnumStorage } from './token.service'
import { TAuthResponse, TLoginUser } from '@/schemas/Auth.schema'
import { axiosClassic } from '@/api/axios'
import { API_URL } from '@/lib/api.config'

class AuthService {
	async main(type: 'login' | 'register', data: TLoginUser) {
		const response = await axiosClassic.post<TAuthResponse>(
			API_URL.auth(`/${type}`),
			data
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	}

	async getNewTokens() {
		const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN)

		const response = await axiosClassic.post<string, { data: TAuthResponse }>(
			API_URL.auth(`/login/access-token`),
			{ refreshToken }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	}

	async logout() {
		removeFromStorage()
		localStorage.removeItem(EnumStorage.USER)
	}
}

export const authService = new AuthService()