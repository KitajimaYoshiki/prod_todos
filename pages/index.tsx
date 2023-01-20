import Head from 'next/head'
import React from 'react'

import Login from './login'
import View from './view'

const Home = () => {
  const [menu, setMenu] = React.useState('')
  return (
    <div>
      <Head>
        <title>To-do App</title>
      </Head>
      <>
        {menu == '' && <Login setMenu={setMenu} />}
        {menu == 'view' && <View setMenu={setMenu} />}
      </>
    </div>
  )
}

export default Home
