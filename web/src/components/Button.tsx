import classNames from "classnames"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { ClipLoader } from "react-spinners"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  isLoading?: boolean
  icon?: ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({ title, isLoading, icon, variant = 'primary', ...rest }: Props) {
  return (
    <button 
      className={
        classNames('flex items-center gap-2 bg-yellow-500 py-4 px-6 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700 disabled:opacity-90 disabled:cursor-not-allowed', {
          'bg-red-500 text-white hover:bg-red-600': variant === 'secondary',
        })
      }
      disabled={isLoading}
      {...rest}
    >
      {icon}

      {
        isLoading ? <ClipLoader size={20} color="white" /> :
        title
      }
    </button>
  )
}