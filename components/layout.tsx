import Head from 'next/head'

export default function Layout({ children }:any) {
  return (
    <>
      <Head>
        <title>Layouts for beers</title>
      </Head>
      <main>{children}</main>
    </>
  )
}