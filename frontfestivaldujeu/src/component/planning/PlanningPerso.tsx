import React from 'react'

interface PlanningProps {
  //list_jours
  list_jours:{id:number,nom:string,list_horaire:[number,number][]}[]
  list_creneau:{id:number,jour:number,horaire:[number,number],titre:string,nb_max:number,nb_inscrit:number,ouvert:boolean,list_benevole:{prenom:string,pseudo:string}[],referent:{prenom:string,pseudo:string,email:string}[]}[]
}

export const PlanningPerso : React.FC<PlanningProps> = ({
  list_jours,
  list_creneau
}) => {

  return (
    <div>
      <table className='border border-slate-400 border-collapse'>
          <col/>
          <colgroup span={list_jours.length}></colgroup>
          <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
            <tr>
              {list_jours.map((jour)=> (
                <th colSpan={jour.list_horaire.length} scope="colgroup" className="px-6 py-3 bg-blue-500 border border-slate-300">
                {jour.nom}
                </th>
              ))}
            </tr>
            <tr>
              {list_jours.map((jour)=> (
              <>
                {jour.list_horaire.map((horaire) => (
                <th scope="col" className="px-6 py-3 bg-blue-500 border border-slate-300">
                <div>{horaire[0]}h-{horaire[1]}h</div>
                </th>
                ))}
              </>
              ))}
            </tr>
          </thead>
          <tbody>
          {list_jours.map((jour)=> (
              <>
                {jour.list_horaire.map((horaire) => (
                <td scope="col" className="px-6 py-3 bg-blue-500 border border-slate-300">
                </td>
                ))}
              </>
              ))}
          </tbody>
      </table>
    </div>
  )
}
