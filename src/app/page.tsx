'use client'

import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '@/redux/slices/counterSlice'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';



export default function Home() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch()

  const { count } = counter

  console.log('counter ==> ', counter.count)


  const [rows, setRows] = useState([]);

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const apiUrlList = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    try {
      const response = await fetch(apiUrlList, {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
        }
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      });

      // console.log('response => ', JSON.stringify(response, null, 2));

      setRows(response.results)

    } catch (error) {
      console.log(error);
    }
  }

  // console.log('ROW => ', JSON.stringify(rows, null, 2));


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl">Welcome</h1>
      <h3>Count: {count} </h3>

      <div className="mt-4">
        <Button className="mx-2" variant="outlined" onClick={() => dispatch(increment())}>
          + 1
        </Button>
        <Button className="mx-2" variant="outlined" onClick={() => dispatch(decrement())}>
          - 1
        </Button>
      </div>


      <div className="p-8">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Picture</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    </main>
  )
}
