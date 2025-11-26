import { defineStore } from 'pinia'
import { createUserManager, storeUser, getStoredUser, clearStoredUser } from '@/auth/oidc'

interface OidcUser {
  profile?: { name?: string; email?: string }
  access_token?: string
  id_token?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: getStoredUser() as OidcUser | null,
    loading: false,
    error: '' as string | null
  }),
  getters: {
    isAuthenticated: (s) => !!s.user?.id_token || !!s.user?.access_token,
    displayName: (s) => s.user?.profile?.name || s.user?.profile?.email || 'User'
  },
  actions: {
    init() {
      const mgr = createUserManager()
      mgr.events.addUserLoaded((u) => {
        storeUser(u)
        this.user = u as any
      })
      mgr.events.addUserUnloaded(() => {
        clearStoredUser()
        this.user = null
      })
      mgr.events.addAccessTokenExpired(() => {
        clearStoredUser()
        this.user = null
      })
      window.addEventListener('storage', (e) => {
        if (e.key === 'oidc_user') {
          this.user = getStoredUser()
        }
      })
    },
    async login() {
      const mgr = createUserManager()
      await mgr.signinRedirect()
    },
    async completeLogin() {
      this.loading = true
      try {
        const mgr = createUserManager()
        const user = await mgr.signinRedirectCallback()
        storeUser(user)
        this.user = user as any
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'Login failed'
      } finally {
        this.loading = false
      }
    },
    async logout() {
      try {
        const mgr = createUserManager()
        clearStoredUser()
        this.user = null
        await mgr.signoutRedirect()
      } catch {
        clearStoredUser()
        this.user = null
      }
    }
  }
})
