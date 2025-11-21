import { UserManager, WebStorageStateStore, Log } from 'oidc-client-ts'

const issuer = import.meta.env.VITE_OIDC_ISSUER as string
const client_id = import.meta.env.VITE_OIDC_CLIENT_ID as string
const redirect_uri = import.meta.env.VITE_OIDC_REDIRECT_URI as string
const post_logout_redirect_uri = import.meta.env.VITE_OIDC_LOGOUT_REDIRECT_URI as string || window.location.origin + '/'
const scope = (import.meta.env.VITE_OIDC_SCOPES as string) || 'openid profile email'

export const createUserManager = () => {
  if (!issuer || !client_id || !redirect_uri) {
    throw new Error('OIDC 未配置：请设置 VITE_OIDC_ISSUER、VITE_OIDC_CLIENT_ID、VITE_OIDC_REDIRECT_URI')
  }
  Log.setLevel(Log.NONE)
  return new UserManager({
    authority: issuer,
    client_id,
    redirect_uri,
    post_logout_redirect_uri,
    response_type: 'code',
    scope,
    userStore: new WebStorageStateStore({ store: window.localStorage })
  })
}

export const storeUser = (user: any) => {
  localStorage.setItem('oidc_user', JSON.stringify(user))
}

export const getStoredUser = () => {
  const raw = localStorage.getItem('oidc_user')
  return raw ? JSON.parse(raw) : null
}

export const clearStoredUser = () => {
  localStorage.removeItem('oidc_user')
}

