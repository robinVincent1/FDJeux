import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Festival } from './PageFestival';

type Props = {
    listeFesti: Festival[],
}

export default function tableau({listeFesti}: Props) {



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">En cours</TableCell>
            <TableCell align="right">Nom</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Nombre Référent</TableCell>
            <TableCell align="right">Nombre Réspo Soirée</TableCell>
            <TableCell align="right">Nombre Bénévole Accueil</TableCell>
            <TableCell align="right">Nombre Bénévole</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listeFesti.map((row) => (
            <TableRow
              key={row.nom}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.idFestival}
              </TableCell>
              <TableCell align="center">{row.enCours ? "oui" : "non"}</TableCell>
              <TableCell align="right">{row.nom}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="center">{row.nbReferent}</TableCell>
              <TableCell align="center">{row.nbRespoSoiree}</TableCell>
              <TableCell align="center">{row.nbAccueilBenevole}</TableCell>
              <TableCell align="center">{row.nbBenevole}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}