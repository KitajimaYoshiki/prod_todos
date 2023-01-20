import Head from 'next/head'
import React from 'react'

import MenuBar from './parts/MenuBar'

const View = (props: any) => {
  const handle = (name: string) => {
    props.setMenu(name)
  }
  return (
    <div>
      <Head>
        <title>To-do App</title>
      </Head>
      <MenuBar setMenu={props.setMenu} />
    </div>
  )
}

export default View
