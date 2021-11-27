import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import NProgress from 'nprogress';
import Router from 'next/router';
import "nprogress/nprogress.css";

import store from '../store/store'

NProgress.configure({
  minimum: 0.5,
  easing: 'ease',
  speed: 800,
  showSpinner: true,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}