import useSWR from 'swr';
import { authApi } from 'api-client';
import { PublicConfiguration } from 'swr/dist/types';

export function useAuth(options?: Partial<PublicConfiguration>) {
    const { data: profile, error, mutate} = useSWR("/profile", {
        revalidateOnFocus: false,
        dedupingInterval: 60 * 60 * 1000,
        ...options
    })

    async function login() {
        await authApi.login({
          username: "thanhdat",
          password: "123456",
        })

        await mutate();
    }

    async function logout() {
         await authApi.logout();
         await mutate({}, false);
    }

    return {
      profile,
      error,
      login,
      logout,
    }
}