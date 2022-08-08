import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { RecoilRoot } from 'recoil'
import ProtectedRoute from '../components/ProtectedRoutes'
import { AuthContextProvider } from '../context/AuthContext'
import '../styles/globals.css';
import { useRouter } from 'next/router'


const noAuthRequired = ['/login', '/signup','']

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  const router = useRouter()
  return (
    <AuthContextProvider>
      {/* <RecoilRoot>  */}
      {/* <ThemeProvider attribute="class"> */}
      <Component {...pageProps} />
      {/* </ThemeProvider> */}
      {/* </RecoilRoot> */}
    </AuthContextProvider>
  )
}

export default MyApp
