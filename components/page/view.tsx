import Head from 'next/head'
import React from 'react'

import MenuBar from '../parts/MenuBar'

const View = (props: any) => {
  return (
    <div>
      <MenuBar setMenu={props.setMenu} />
    </div>
  )
}

export default View
