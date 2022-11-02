import * as Dialog from '@radix-ui/react-dialog'
import { Check, Copy, X } from 'phosphor-react'
import { useState } from 'react'

interface Props extends Dialog.DialogProps {
  code: string
}

export function SuccessCreatePool({ code, ...rest }: Props) {

  const [codeCopiedToClipboard, setCodeCopieToClipboard] = useState(false)

  async function handleCopyCodeToClipboard() {
    try {
      await navigator.clipboard.writeText(code)

      setCodeCopieToClipboard(true)

      setTimeout(() => {
        setCodeCopieToClipboard(false)
      }, 1000)  
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Dialog.Root {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed h-screen w-screen inset-0 bg-black opacity-70" />
        
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded">
          <header className="flex justify-end mb-4">
            <Dialog.Close className="rounded hover:bg-gray-700 p-1">
              <X size={24} className="text-gray-100" />
            </Dialog.Close>
          </header>
          
          <div className="flex flex-col items-center">
            <span className="text-gray-100 font-bold text-xl">Uhuu! Seu bolão foi criado com sucesso</span>

            <p className="text-gray-300 mt-2">Compartilhe o código abaixo com seus amigos para participarem do seu bolão</p>

            <button 
              className="bg-gray-900 rounded w-60 flex items-center justify-center p-3 mt-5 text-gray-100"
              onClick={handleCopyCodeToClipboard}
            >
              <span className="font-bold flex flex-1 justify-center">{code}</span>

              {
                codeCopiedToClipboard ?
                <Check size={20} className="text-yellow-500" /> :
                <Copy size={20} />
              }
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}