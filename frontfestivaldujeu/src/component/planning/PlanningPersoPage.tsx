import React from 'react'
import {PlanningPerso} from './PlanningPerso'

export const PlanningPersoPage = () => {
  return (
    <div><PlanningPerso list_jours={[{id:0,nom:"Samedi",list_horaire:[[9,11],[11,14]] }, {id:1,nom:"Dimanche",list_horaire:[[9,11],[14,17]]}]} list_creneau={[]}/></div>
  )
}
