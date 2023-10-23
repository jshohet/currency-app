import Image from 'next/image'
import Header from './components/Header'
import DataLoad from './components/DataLoad'

export default function Home() {
  return (
    <main>
      <Header />
      <DataLoad />
    </main>
  )
}
