import React from 'react'
import Creneau from './Creneau'

export default function () {
  return (
    <div><Creneau ouvert={true} horaire="9h-11h" jour="Samedi" titre="oui" nb_max={15} nb_inscrit={8} /></div>
  )
}
