import useSWR, { SWRConfiguration } from "swr"
import { authApi } from "api-client"
import { ProfileResponse } from "models"

export const useAuth = (options?: SWRConfiguration) => {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR<ProfileResponse | null>("/profile", {
    revalidateOnFocus: false,
    dedupingInterval: 60 * 60 * 1000,
    ...options,
  })

  // first loading use for case refresh page
  const firstLoading = profile === undefined && error === undefined

  async function login() {
    await authApi.login({
      username: "thanhdat",
      password: "123456",
    })

    await mutate()
  }

  async function logout() {
    await authApi.logout()
    // avoid mutate with value data undefined --> swr wil get previous data
    await mutate(null, false)
  }

  return {
    profile,
    error,
    login,
    logout,
    firstLoading,
  }
}
