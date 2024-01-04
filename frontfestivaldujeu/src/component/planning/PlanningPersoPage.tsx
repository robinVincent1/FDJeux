import React from 'react'
import {PlanningPerso} from './PlanningPerso'

export const PlanningPersoPage = () => {
  return (
    <div><PlanningPerso userid={parseInt(localStorage.getItem('userId') ?? '') || 0} /></div>
  )
}
