import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FormEvent, useState } from 'react'

import appPreviewImg from '../assets/app-preview.png'
import avatarsImg from '../assets/avatars.png'
import iconCheckImg from '../assets/icon-check.svg'
import logoImg from '../assets/logo.svg'
import { SuccessCreatePool } from '../components/SuccessCreatePool'
import { api } from '../lib/axios'

interface Props {
  poolCount: number
  guessCount: number
  userCount: number
}

export default function Home(props: Props) {

  const [poolTitle, setPoolTitle] = useState('')

  const [codePoolCreated, setPoolCreated] = useState('')

  const [openDialogSuccess, setOpenDialogSuccess] = useState(false)

  async function handleCreatePool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })
      
      const { code } = response.data

      setPoolCreated(code)

      setPoolTitle('')

      setOpenDialogSuccess(true)
    } catch (err) {
      alert('Falha ao criar o bolão. Tente novamente.')
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <Head>
        <title>NLW Copa</title>
      </Head>

      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={avatarsImg} alt="" />

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={handleCreatePool} className="mt-10 flex gap-2">
          <input 
            className="flex-1 py-4 px-6 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text" 
            required 
            placeholder="Qual nome do seu bolão?"
            value={poolTitle}
            onChange={event => setPoolTitle(event.target.value)} 
          />

          <button className="bg-yellow-500 py-4 px-6 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700">
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />

            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />

            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={appPreviewImg} alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa" quality={100} />
      
      <SuccessCreatePool 
        open={openDialogSuccess} 
        onOpenChange={setOpenDialogSuccess}
        code={codePoolCreated} 
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [
    poolCountResponse, 
    guessCountResponse, 
    userCountResponse
  ] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    },
  }

}