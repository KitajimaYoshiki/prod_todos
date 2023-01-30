import Head from 'next/head'
import React from 'react'

import Create from '../components/page/create'
import Login from '../components/page/login'
import View from '../components/page/view'

const Home = () => {
  const [menu, setMenu] = React.useState('')
  const [userId, setUserId] = React.useState<string>('')
  return (
    <div>
      <Head>
        <title>To-do App</title>
      </Head>
      <>
        {menu === '' && <Login setMenu={setMenu} setUserId={setUserId} />}
        {menu === 'view' && <View setMenu={setMenu} userId={userId} />}
        {menu === 'create' && <Create setMenu={setMenu} />}
      </>
    </div>
  )
}

export default Home
