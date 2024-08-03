import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { Link, Navigate, useNavigate } from 'react-router-dom';
import TextItem from '../TextItem/TextItem.jsx';

const formatDuration = (duration) => {
  const [hours, minutes, seconds] = duration.split(':').map(part => parseFloat(part));

  const totalMinutes = hours * 60 + minutes;
  const formattedMinutes = totalMinutes;
  const formattedSeconds = Math.floor(seconds);

  return `${formattedMinutes}:${formattedSeconds.toString().padStart(2, '0')}`;
};

const getFileExtension = (url) => {
  if (!url) return 'نامشخص';

  const parts = url.split('.'); 
  if (parts.length > 1) {
    return parts.pop();
  }
  return 'نامشخص';
};


const Archive = () => {
  const columns = [
    {
      id: 'icons',
      label: '',
      minWidth: 10,
      align: 'right',
      // format: (value) => value.toFixed(2),
    },
    { id: 'duration', label: 'مدت زمان', minWidth: 10, align: 'right' },
    { id: 'type', label: 'نوع فایل', minWidth: 10, align: 'right' },
    {
      id: 'processed',
      label: 'تاریخ بارگذاری',
      minWidth: 10,
      align: 'right',
      // format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'url',
      label: 'نام فایل',
      minWidth: 50,
      align: 'right',
      // format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'rightIcon', label: '', minWidth: 10, align: 'right' },

  ];

  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [fileSizes, setFileSizes] = useState({}); 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/requests/', {
        headers: {
          Authorization: 'Token a85d08400c622b50b18b61e239b9903645297196',
        },
      });

      if (response.data && Array.isArray(response.data.results)) {
        console.log(response.data.results);
        setRows(response.data.results);

        // const sizes = {};
        // for (const row of response.data.results) {
        //   const fileSize = await getFileSize(row.url);
        //   sizes[row.id] = fileSize;
        // }
        // setFileSizes(sizes);
      } else {
        console.error('Received data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []); 

  const handleDeleteRequest = async (requestId) => {
    try {
      const response = await axios.delete(`/api/requests/${requestId}/`, {
        headers: {
          Authorization: 'Token a85d08400c622b50b18b61e239b9903645297196',
        },
      });

      if (response.status === 204) {
        console.log(`Request ${requestId} deleted successfully.`);
        setRows(rows.filter((row) => row.id !== requestId)); 
      } else {
        console.error(`Failed to delete request ${requestId}.`);
      }
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  // const getFileSize = async (url) => {
  //   try {
  //     const response = await axios.head(url); 
  //     const contentLength = response.headers['content-length']; 
  //     return contentLength ? parseInt(contentLength, 10) : 0; 
  //   }
  //   catch (error) {
  //     console.error('Error fetching file size:', error);
  //     return 0;
  //   }
  // };


  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState(null);

  const handleRowClick = (rowId) => {
    setSelectedRowId((prevSelectedRowId) => (prevSelectedRowId === rowId ? null : rowId));
  };

  const handleUrl = (Url) => {
    setSelectedUrl(Url);
    console.log(Url);
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
                    style={{ minWidth: column.minWidth, fontFamily: 'Yekan', fontSize: '12px', borderBottom: '0px', width:'12px' }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <React.Fragment key={row.id}>
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const fileSize = fileSizes[row.id];

                      return (
                        <TableCell key={column.id} align={column.align} 
                        style={{ fontFamily: 'Yekan', fontSize: '13px',
                              borderBottom: '0px', textAlign: 'center', padding: '9px'}}
                        onClick={() => handleRowClick(row.id) && handleUrl(row.url) }>
                          {column.id === 'url' ? (
                            <Link to={value} target="_blank" rel="noopener noreferrer"
                            style={{ fontSize:'15px' }}
                            className='truncated-link'>
                              {value}
                            </Link> 
                          ) : column.id === 'type' ? (
                            <div style={{ fontFamily:'sans-serif', fontSize:'12px' }}>
                              .{getFileExtension(row.url)}
                            </div>
                          ) : ''}

                          {column.id === 'duration' && (
                            <div >
                              {formatDuration(value)}
                            </div>
                          )}

                          {column.id === 'processed' && (
                            <div>
                              {value.substring(0, 10)}
                            </div>
                          )}


                          {column.id === 'rightIcon' && (
                            <div className='submit-link-icon'>
                              <span class="material-symbols-outlined">link</span>
                            </div>
                          )}

                          {column.id === 'icons' && (
                            <div className="icons-style">
                              <Tooltip color="danger" content="حذف" style={{ fontSize: '13px', fontFamily: 'Yekan' }}>
                                <span className="delete-icon-style" onClick={() => handleDeleteRequest(row.id)}>
                                  <span className="material-symbols-outlined">Delete</span>
                                </span>
                              </Tooltip>
                              <Tooltip color="danger" content="کپی" style={{ fontSize: '13px', fontFamily: 'Yekan' }}>
                                <span className="copy-icon-style">
                                  <span className="material-symbols-outlined">content_copy</span>
                                </span>
                              </Tooltip>
                              <Tooltip color="danger" content="">
                                <span className="draft-icon-style">
                                  <span className="material-symbols-outlined">draft</span>
                                </span>
                              </Tooltip>
                              <a href={row.url} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                              <Tooltip content={`${fileSize}مگابایت`}
                              style={{ fontSize: '13px', fontFamily: 'Yekan' }}
                              placement="bottom">
                                <span className="download-icon-style">
                                  <span className="material-symbols-outlined">download</span>
                                </span>
                              </Tooltip>
                              </a>

                            </div>
                          )}
                        </TableCell>
                      );
                    })}

                  </TableRow>
                  {selectedRowId === row.id && (
                    <TableRow>
                      <TableCell colSpan={columns.length} className='selected-row'>
                        <TextItem content={row.url} />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          style={{ fontFamily: 'Yekan' }}
          rowsPerPageOptions={[5, 10, 25, 100]}
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