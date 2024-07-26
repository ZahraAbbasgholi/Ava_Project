import React from 'react';
import './Archive.css';
import Sidebar from '../Sidebar/Sidebar';
import '../SpeechConversion/SpeechConversion.jsx';
import '../SpeechConversion/SpeechConversion.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Tooltip } from "@nextui-org/react";

const Archive = () => {
  const columns = [
    {
      id: 'icons',
      label: '',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    { id: 'time', label: 'مدت زمان', minWidth: 100, align: 'right' },
    { id: 'type', label: 'نوع فایل', minWidth: 100, align: 'right' },
    {
      id: 'date',
      label: 'تاریخ بارگذاری',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'name',
      label: 'نام فایل',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  function createData(name, date, type, time) {
    return { name, date, type, time };
  }

  const rows = [
    createData('file1', '1400-08-21', '.mp3', '4:29'),
    createData('file2', '1400-08-20', '.mp4', '4:28'),
    createData('فایل سوم', '1400-08-19', '.mav', '3:14'),
  ];


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Sidebar />

      <div className="sec-center">
        <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />
        <label className="for-dropdown" for="dropdown">
          <div className='button-18 icon-text-direction'>
            <span className="material-symbols-outlined ">person</span>
            <span>مهمان</span>
            <span class="material-symbols-outlined">arrow_drop_down</span>
            <i className="uil uil-arrow-down"></i>
          </div></label>
        <div className="section-dropdown">
          <a href="#" style={{ direction: "rtl" }}>
            <span className="material-symbols-outlined icon-text-direction">logout</span>
            <span>خروج</span>
            <i className="uil uil-arrow-right"></i></a>
        </div>
      </div>

      <Paper className='table-style'
        sx={{ boxShadow: 'none' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontFamily: 'Yekan', fontSize: '13px' }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Yekan', fontSize: '13px' }}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}

                            {column.id === 'icons' && (
                              <div className="icons-style">
                                <Tooltip color="danger" content="حذف" style={{ fontSize: '13px', fontFamily: 'Yekan' }}>
                                  <span className="delete-icon-style">
                                    <span class="material-symbols-outlined">Delete</span>
                                  </span>
                                </Tooltip>
                                <Tooltip color="danger" content="کپی" style={{ fontSize: '13px', fontFamily: 'Yekan' }}>
                                  <span className="copy-icon-style">
                                    <span class="material-symbols-outlined">content_copy</span>
                                  </span>
                                </Tooltip>
                                <Tooltip color="danger" content="">
                                  <span className="draft-icon-style">
                                    <span class="material-symbols-outlined">draft</span>
                                  </span>
                                </Tooltip>
                                <Tooltip content="دانلود" style={{ fontSize: '13px', fontFamily: 'Yekan' }}>
                                  <span className="download-icon-style">
                                    <span className="material-symbols-outlined">download</span>
                                  </span>
                                </Tooltip>
                              </div>
                            )}
                          </TableCell>

                        );
                      })}

                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          style={{ fontFamily: 'Yekan' }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

export default Archive