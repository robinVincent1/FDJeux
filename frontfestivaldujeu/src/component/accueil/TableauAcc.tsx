import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Festival } from '../festival/PageFestival';


type Props = {
    Festi: Festival,
}

export default function TableauAcc({Festi}: Props) {



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Nom</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Nombre Référent</TableCell>
            <TableCell align="right">Nombre Réspo Soirée</TableCell>
            <TableCell align="right">Nombre Bénévole Accueil</TableCell>
            <TableCell align="right">Nombre Bénévole</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key={Festi.nom}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell align="right">{Festi.nom}</TableCell>
              <TableCell align="right">{Festi.date}</TableCell>
              <TableCell align="center">{Festi.nbReferent}</TableCell>
              <TableCell align="center">{Festi.nbRespoSoiree}</TableCell>
              <TableCell align="center">{Festi.nbAccueilBenevole}</TableCell>
              <TableCell align="center">{Festi.nbBenevole}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}