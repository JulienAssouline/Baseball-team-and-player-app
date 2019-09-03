import React, {useState} from 'react';
import '../css/player.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



  const row = (d, i, headers) =>
    <TableRow className = "table rows" key={`tr-${i}`}>
        {headers.map((j, k) =>
        <TableCell key={`trc-${k}`}>
            {
               j === "season" ? d[j] : (j === "team" && d.team) ? 
               <img className = "table-team-image" src = {`https://www.mlbstatic.com/team-logos/${d.team.id}.svg`} alt={`${d.team}`}></img>
               : typeof d.stat[j] === "object" ? d.stat.position.abbreviation 
               : d.stat[j]
            }
        </TableCell>
        )}
    </TableRow>;



function TableData(props) {
    const {data, headers, headerAbr, title} = props
    const [direction, setDirection] = useState("desc")
    const [dataSorted, setDataSorted] = useState([])

    let dataSplit = data.splits
    
    function sortTable(value){
        if (direction === "desc") {
            dataSplit.sort((a,b) =>  b.stat[value] - a.stat[value])
            setDataSorted(dataSplit)
            setDirection("asc")
        }
        else {
            dataSplit.sort((a,b) => a.stat[value] - b.stat[value])
            setDirection("desc")
            setDataSorted(dataSplit)
        }
    }

    return (
        <div className = "table-stats-container">
            <h1> {title} </h1>
            <Paper className = "table container">
                <Table className = "data table">
                    <TableHead>
                        <TableRow className = "header row">
                            {headers.map((d, i) =>
                            <TableCell onClick = {(() => sortTable(d, i))} className = "hitting headers" key={`thc-${i}`}>
                                {headerAbr[i]}
                            </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataSorted.length > 0 ? 
                            dataSorted.map((d,i) => row(d, i, headers)) 
                            : dataSplit.map((d, i) => row(d, i, headers))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default TableData;
