import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { GoogleLogo, SignOut } from 'phosphor-react'

import { Button } from './Button'

import logoImg from '../assets/logo.svg'

export function Header() {
  const { data: session, status } = useSession()

  async function handleSignInWithGoogle() {
    signIn('google')
  }
  
  return (
    <header className="flex items-center justify-between w-full">
      <Image src={logoImg} alt="NLW Copa" />

      {
        status !== 'authenticated' ?
        <Button 
          icon={<GoogleLogo size={18} weight="bold" />}
          title="Entrar com Google"
          variant="secondary"
          onClick={handleSignInWithGoogle}
        /> :
        <div className="flex items-center gap-3">
          <span className="text-gray-200 font-bold">{session.user?.name}</span>

          <Image 
            src={String(session.user?.image)} 
            width={32} 
            height={32} 
            alt="" 
            className="rounded-full"
          />

          <button onClick={() => signOut()} className="border-l-1 border-gray-500 pl-6 ml-3">
            <SignOut color="white" size={24} weight="bold" />
          </button>
        </div>
      }
    </header>
  )
}