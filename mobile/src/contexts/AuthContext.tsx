import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  isUserLoading: boolean
  signIn: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextDataProps)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [isUserLoading, setIsUserLoading] = useState(false)

  const [user, setUser] = useState({} as UserProps)

  const [, response, promptAsync] = Google.useAuthRequest({
    clientId: '688457468799-p68su74f6akmg184u3cdm7b9p6mosv7j.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn(){
    setIsUserLoading(true)

    try {
      await promptAsync()

    } catch (error) {
      console.log(error)

      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle(accessToken: string) {
    setIsUserLoading(true)

    try {
      const tokenResponse = await api.post('users', {
        access_token: accessToken
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`

      const userInfoResponse = await api.get('/me')

      setUser(userInfoResponse.data.user)
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication?.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}