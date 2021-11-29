import type { GetServerSideProps, NextPage } from 'next'
import Main from '../components/Main'
import { ReactElement, useEffect, useLayoutEffect } from 'react'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { InferGetServerSidePropsType } from 'next'
import axios from 'axios';
import { useRouter } from 'next/router'
import { useStore, useSelector, useDispatch } from "react-redux";
import { CreateActionSetBeer } from '../actions/actions'



export default function Home({beers}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  // window.history.replaceState(null, '', '/')
  const { food } = router.query
  console.log(beers, food)
  const dispatch = useDispatch();
  dispatch(CreateActionSetBeer(beers));
  

  useLayoutEffect(() => {
    window.addEventListener('load', ()=>{
      // window.history.replaceState(null, '', '/')
      router.push('/')
      console.log('****')
      
    },false)
    // window.removeEventListener('load',()=>{
    //   console.log('gggg')
      
    // }, false
    //   )
})

  return (
    <Main />
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
       {/*@ts-ignore */}
      <Navbar/>
      {page}
    </Layout>
  )
}

// const beersURL:string = props?.food ? `${process.env.BEERS_URL}?food=${props?.food}` : process.env.BEERS_URL as string;

const fetchData = async (beersURL: string) => await axios.get(beersURL)
  .then(res => ({
    error: false,
    beers: res.data,
  }))
  .catch(() => ({
      error: true,
      beers: null,
    }),
  );
  

  export const getServerSideProps:GetServerSideProps = async ({
    params,
    res
  }:any) => {

    const url = res.req.url.split('=')[1]
    const beersURL:string = url ? `${process.env.BEERS_URL}?food=${url}` : process.env.BEERS_URL as string;
    console.log('params', url)
    const data = await fetchData(beersURL);

    return {
      props: data
    };
  }
