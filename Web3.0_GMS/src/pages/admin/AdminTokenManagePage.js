import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { gradeTokenOffering } from '../../backend/score_data';
// import FormHelperText from '@mui/material/FormHelperText';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TableHead
} from '@mui/material';
// components
import axios from 'axios';
// sections
// import { AdminListHead, AdminTokenToolbar } from '../../sections/@dashboard/admin';
// mock

import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';

import * as React from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import TOKENLIST from '../../_mock/token';
// import FormControl from '@mui/material/FormControl';
import { AdminListHead } from '../../sections/@dashboard/admin';



// import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'token', label: '토큰 이름', alignRight: false },
  { id: 'submission', label: '제출 인원', alignRight: false },
  { id: 'total_score', label: '총 배점', alignRight: false },
  { id: 'edit_token', label: '세부 내용', alignRight: false },
  { id: 'delete_token', label: '삭제', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
// function add_click() {
//   console.log("버튼1을 누르셨습니다.");
// }

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function HomePage() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [list, setTokenList] = useState([]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = TOKENLIST.map((n) => n.name);
      setSelected(newSelecteds);

    
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const goStudentList = () => {
    navigate("/a_dashboard/a_studentlist");
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const goFixContent = () => {
    navigate("/dashboard/ranking");
    
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - TOKENLIST.length) : 0;

  const filteredUsers = applySortFilter(TOKENLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const goSyllabus = () => {
    navigate("/dashboard/profile");
  };
  const goAttendance = () => {
    navigate("/dashboard/attendance");
  };
  const goGrade = () => {
    navigate("/dashboard/grade");
  };
  const goRanking = () => {
    navigate("/dashboard/ranking");
  };


  const handleClose = () => {
    setOpen(false);
    setForCreate(false);
    setForEdit(false);
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [openForCreate, setForCreate] = React.useState(false);
  const [openForEdit, setForEdit] = React.useState(false);


  const handleClickOpenForCreate = () => {
    setForCreate(true);
  }

  const handleCloseForCreate = () => {
    setForCreate(false);
  }

  // const handleClickOpenForEdit = (tokenId) => {
  //   setForEdit(true);
  // }
  useEffect(() => {
    axios.get(`/a_dashboard/a_tokenmanage/`).then((response) => {
      setTokenList(response.data)
    }).catch((error) => {
      console.log(error);
    });
  }, [])
  
  // Token 관리

  const [courseName, setCourseName] = useState("");
  const [section, setSection] = useState(0);
  const [type, setType] = useState("");
  const [tokenName, setTokenName] = useState("");
  // const [submitNum, setSubmitNum] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [data, setData] = useState(null);
  const [updateTokenId, setUpdateToken] = useState(0);

  // const plusTokenID = () => {
  //   setUpdateToken()
  // }

   // Token 발행을 위한 구성
  
  const submitToken = () => {
    console.log("잘 나오느냐... -> " + type);
    axios.post('/a_dashboard/a_tokenmanage', {
      courseName,
      section,
      type,
      tokenName,
      // submitNum,
      totalScore
    }).then(() => {
      alert("Successful insert");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
    handleCloseForCreate();
    
    // 임시 TokenID 증가
    // plusTokenID();
//    gradeTokenOffering('default', 0, 'default', 'notUse', 7, 7, 'notUse');

//    tokenOffering(courseName, section, type, tokenName, totalScore);
  };

  const tokenDelete = (tokenId) => {
    console.log("token ID 잘 넘어오니 -> " + tokenId);
    axios.delete(`/a_dashboard/a_tokenmanage/${tokenId}`)
      .then(() => {
        alert("Successful delete");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Token 정보 수정을 위한 구성

  const handleClickOpenForEdit = async (type, courseName, tokenName, section, totalScore, tokenID) => {
    setForEdit(true);
    console.log("type: " + type);
    console.log("courseName: " + courseName);
    console.log("tokenName: " + tokenName);
    console.log("section: " + section);
    console.log("totalScore: " + totalScore);
    console.log("tokenId: " + tokenID);
    setType(type);
    setCourseName(courseName);
    setSection(section);
    setTokenName(tokenName);
    setTotalScore(totalScore);
    setUpdateToken(tokenID)
  }

  const handleCloseForEdit = () => {
    setForEdit(false);
  }

  const handleUpdateData = () => {
    console.log("token ID 잘 넘어오니 -> " + updateTokenId);
    axios.post(`/a_dashboard/a_tokenmanage/update/${updateTokenId}`, {
      courseName,
      section,
      type,
      tokenName,
      totalScore
    }).then(() => {
      alert("Successful update");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
    setUpdateToken(0);
    handleCloseForEdit();

   // tokenOffering('default', 0, 'default', 'notUse', 7);
  };

  return (
    <>
      <Helmet>
        <title> 토큰 관리 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            토큰 관리
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick= {handleClickOpenForCreate} > 
            토큰 생성         
          </Button>

          <Dialog open={openForCreate} onClose={handleCloseForCreate}>
              <DialogTitle>토큰 생성</DialogTitle>
              <DialogContent>
              
                <RadioGroup
                  row
                  aria-labelledby="demo-form-control-label-placement"
                  name="position"
                  // defaultValue="homework"
                  // value={type} // 선택된 값
                  onChange={(e) => setType(e.target.value)} // 선택 값 변경 시 setType() 호출
                >
                  <FormControlLabel
                    value="homework"
                    control={<Radio />}
                    label="과제"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="exam"
                    control={<Radio />}
                    label="시험"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="quiz"
                    control={<Radio />}
                    label="퀴즈"
                    labelPlacement="top"
                  />
                 
                  </RadioGroup>
              
                  <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="과목명"
                  type="email"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setCourseName(e.target.value);
                  }}                
                />
                 <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="분반"
                  type="email"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setSection(e.target.value);
                  }}                
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="토큰명"
                  type="email"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setTokenName(e.target.value);
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="점수"
                  type="email"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setTotalScore(e.target.value);
                  }}
                />

              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={submitToken}>생성</Button>
              </DialogActions>
            </Dialog>
        </Stack>
        
        <Card>
        

          {/* 변화를 줄 요소 */}
            <Scrollbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>수업명</TableCell>
                    <TableCell align='center'>토큰 이름</TableCell>
                    <TableCell align='center'>분반</TableCell>
                    <TableCell align='center'>총 배점</TableCell>
                    <TableCell align='center'>세부 내용</TableCell>
                    <TableCell align='center'>삭제</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((row) => (
                    <TableRow key={row.tokenID}>
                      <TableCell align='center'>{row.courseName}</TableCell>
                      <TableCell align='center'>{row.tokenName}</TableCell>
                      <TableCell align='center'>{row.section}</TableCell>
                      <TableCell align='center'>{row.totalScore}</TableCell>
                      <TableCell align='center'>
                        <Button className='revision' onClick={() => handleClickOpenForEdit(row.type, row.courseName, row.tokenName, row.section, row.totalScore, row.tokenID)}>수정</Button>
                        <Dialog open={openForEdit} onClose={handleCloseForEdit}>
                          <DialogTitle>토큰 수정</DialogTitle>
                          <DialogContent>
                            <RadioGroup
                              row
                              aria-labelledby="demo-form-control-label-placement"
                              name="position"
                              // defaultValue="homework"
                              onChange={(e) => setType(e.target.value)} // 선택 값 변경 시 setType() 호출
                            >
                              <FormControlLabel
                                value="homework"
                                control={<Radio />}
                                label="과제"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="exam"
                                control={<Radio />}
                                label="시험"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="quiz"
                                control={<Radio />}
                                label="퀴즈"
                                labelPlacement="top"
                              />
                            </RadioGroup>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="과목명"
                              type="email"
                              fullWidth
                              variant="standard"
                              value={courseName}
                              onChange={(e) => {
                                setCourseName(e.target.value);
                              }}
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="분반"
                              type="email"
                              fullWidth
                              variant="standard"
                              value={section}
                              onChange={(e) => {
                                setSection(e.target.value);
                              }}
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="토큰명"
                              type="email"
                              fullWidth
                              variant="standard"
                              value={tokenName}
                              onChange={(e) => {
                                setTokenName(e.target.value);
                              }}
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="점수"
                              type="email"
                              fullWidth
                              variant="standard"
                              value={totalScore}
                              onChange={(e) => {
                                setTotalScore(e.target.value);
                              }}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => handleUpdateData()}>수정</Button>
                            <Button onClick={handleCloseForEdit}>취소</Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                      <TableCell align='center'>
                        <Button onClick={() => tokenDelete(row.tokenID)}>삭제</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          {/* 변화가 끝나는 부분 */}
        </Card>
      </Container>
      
    </>
  );
}
