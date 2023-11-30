import React from 'react'
import PlanningGeneral from './PlanningGeneral'

export const PlanningGeneralPage = () => {
  return (
    <div><PlanningGeneral list_jours={[]} list_ligne={[]}/></div>
  )
}
//[{id:0,nom:"Samedi",list_horaire:[[9,11],[11,14]] }, {id:1,nom:"Dimanche",list_horaire:[[9,11],[14,17]]}]