import Head from 'next/head'
import React from 'react'

import Create from '../components/page/create'
import Login from '../components/page/login'
import View from '../components/page/view'

const Home = () => {
  const [menu, setMenu] = React.useState('')
  return (
    <div>
      <Head>
        <title>To-do App</title>
      </Head>
      <>
        {menu === '' && <Login setMenu={setMenu} />}
        {menu === 'view' && <View setMenu={setMenu} />}
        {menu === 'create' && <Create setMenu={setMenu} />}
      </>
    </div>
  )
}

export default Home
