import Image from 'next/image'
import { Inter } from 'next/font/google'
import BaseLayout from '@/components/layout/BaseLayout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <BaseLayout>
    <div>Hello world</div>
    <div>Hello world</div>
    </BaseLayout>
  )
}