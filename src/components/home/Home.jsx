import React from 'react'
import Map from '../map/Map'

export default function Home(props) {
  return (
    <>
      {props.name}
      <Map />
    </>
  )
}