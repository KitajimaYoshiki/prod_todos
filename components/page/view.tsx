import React, { useEffect, useState } from 'react'

import MenuBar from '../parts/MenuBar'

const View = (props: any) => {
  return (
    <div>
      <MenuBar setMenu={props.setMenu} userId={props.userId} />
    </div>
  )
}

export default View
