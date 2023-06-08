import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import axios from 'axios';
import './Admin.css';
import { Autocomplete } from '@mui/material';
import { gradeTokenOffering } from '../../backend/score_data';
import { safeMinting } from '../../backend/safeMint';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Select,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TableHead,
  Box
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
// components

import Scrollbar from '../../components/scrollbar';
// sections
import { AdminListHead, AdminListToolbar } from '../../sections/@dashboard/admin';
// mock
import USERLIST from '../../_mock/AdminUser';
import { SelectChangeEvent } from '@mui/material/Select';

// const selectAll=async ()=>{
//   axios.get('/a_dashboard/a_studentlist')
// }

export default function AdminStudentListPage() {
  
  const [list, setStudentList] = useState([]);

  const [openAttendCre, setAttendCre] = React.useState(false);
  
  const [openGradeCre, setGradeCre] = React.useState(false);
  
  const [name, stname] = useState('');
  
  const [section, setSection] = useState(0);

  const [open, setOpen] = useState(null);

  const [openForEdit, setForEdit] = React.useState(false);

  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  // 성적 정보 담는 변수
  const [selectedToken, setSelectedToken] = useState(null);

  const [courseName, setCourseName] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [type, setType] = useState("");
  const [score, setScore] = useState(0);
  const [contents, setContents] = useState("");
  const [stdAddress, setStdAddress] = useState("");

  // 선택한 토큰 리스트의 데이터 추출 및 저장
  const handleTokenChange = (event, value) => {
    setCourseName(value.value.courseName);
    setTokenName(value.value.tokenName);
    setTotalScore(value.value.totalScore);
    setType(value.value.type);
    // console.log("잘 가져오는가? -> " + value.value.type);
  }

  // 발행된 토큰 리스트들
  const [tokenList, setTokenList] = useState([]);

  const handleClickOpenAttend = () => {
    setAttendCre(true);
  }

  const handleClickOpenGrade = (address) => {
    setGradeCre(true);
    setStdAddress(address);
    // 발행 과제 리스트 구조체화
    axios.get('/a_dashboard/a_studentlist/tokenList').then((response) => {
      // 응답 데이터를 가지고 드롭다운에 표시할 내용을 구성합니다.
      const lists = response.data.map(list => {
        return { value: list, label: `${list.tokenName}` };
      });
      setTokenList(lists);
    })
    .catch(error => {
      console.log(error);
    });
  }

  // console.log("확인 확인 확인 !!! -> " + tokenList.value);

  useEffect(() => {
    axios.get('/a_dashboard/a_studentlist').then((response) => {
        setStudentList(response.data)
      });
  }, []);
  // const handleCloseForCreate = () => {
  //   setForCreate(false);
  // }

  const closeAttend = () => {
    setAttendCre(false);
  };
  const closeGrade = () => {
    setGradeCre(false);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // 성적 입력 후 처리
  const submitToken = async () => {
    try {
      console.log('address: ',stdAddress);
      console.log('courseName: ',courseName);
      console.log('type: ',type);
      console.log('tokenName: ',tokenName);
      console.log('totalScore: ',totalScore);
      console.log('score: ',score);
      console.log('contents: ',contents);
    
      const ipfs_hash = await gradeTokenOffering(courseName, section, type, tokenName, totalScore, score, contents);
      console.log("ipfs_hash in studentlist file: " + ipfs_hash);
      closeGrade();
        //console.log('defaultAccount: ' + defaultAccount);
      safeMinting(ipfs_hash, stdAddress);
      alert("Successful insert");
      // window.location.reload();
    } catch (error) {
      console.log(error);
    } 
  };

    // 출석 토큰 정보 저장 변수
    const weekItems = [
      { value: 10, label: '1주차' },
      { value: 20, label: '2주차' },
      { value: 30, label: '3주차' },
      { value: 40, label: '4주차' },
      { value: 50, label: '5주차' },
      { value: 60, label: '6주차' },
      { value: 70, label: '7주차' },
      { value: 80, label: '8주차' },
      { value: 90, label: '9주차' },
      { value: 100, label: '10주차' },
      { value: 110, label: '11주차' },
      { value: 120, label: '12주차' },
      { value: 130, label: '13주차' },
      { value: 140, label: '14주차' },
      { value: 150, label: '15주차' },
      { value: 160, label: '16주차' },
    ];
    
    const [attend1, setAttend1] = useState(false);
    const [attend2, setAttend2] = useState(false);
    const [grade1, setGrade1] = useState(false);
    const [grade2, setGrade2] = useState(false);

    const handleAttend1Change = () => {
      setAttend1(true);
      setAttend2(false);
    };

    const handleAttend2Change = () => {
      setAttend1(false);
      setAttend2(true);
    };

    const handleGrade1Change = () => {
      setGrade1(true);
      setGrade2(false);
    };

    const handleGrade2Change = () => {
      setGrade1(false);
      setGrade2(true);
    };

  return (
    <>
      <Helmet >
        <title> Student List </title>
      </Helmet>

      <Container>
        <h1> Student List</h1>
        <Card>
          {/* {list.map((val) => {
              return <h1>{name} = {val.profID}</h1>
          })} */}
          <Scrollbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>순서</TableCell>
                    <TableCell align='center'>이름</TableCell>
                    <TableCell align='center'>학번</TableCell>
                    <TableCell align='center'>재이수</TableCell>
                    <TableCell align='center'>토큰 발행정보</TableCell>
                    <TableCell align='center'>출석</TableCell>
                    <TableCell align='center'>성적</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
            
                  {list.map((row) => (
                    <TableRow key={row.profID}>
                      <TableCell align='center'>{row.profID}</TableCell>
                      <TableCell align='center'>{row.studentName}</TableCell>
                      <TableCell align='center'>{row.studentID}</TableCell>
                      <TableCell align='center'>{row.isRetake}</TableCell>
                      <TableCell align='center'>
                        <Button>확인</Button>
                      </TableCell>
                      <TableCell align='center'>
                      <Button onClick= {handleClickOpenAttend}>입력</Button>
                        
                      </TableCell>
                      <TableCell align='center'>
                <Button onClick= {()=> handleClickOpenGrade(row.studentAddress)}>입력</Button>

                  <Dialog open={openAttendCre} onClose={closeAttend}>
                    <DialogTitle>출석토큰 입력</DialogTitle>
                    <DialogContent>
                      <Box sx={{ minWidth: 300 }}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={weekItems}
                          getOptionLabel={(option) => option.label}
                          style={{ width: 300 }}
                          isOptionEqualToValue={(option, value) => option.value === value.value && option.label === value.label}
                          renderInput={(params) => <TextField {...params} label="주차" />}
                        />

                        <br />
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">출석</TableCell>
                                <TableCell align="center">지각</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align="center">1차시</TableCell>
                                <TableCell align="center">
                                  <Checkbox className='attend1' checked={attend1} onChange={handleAttend1Change} />
                                </TableCell>
                                <TableCell align="center">
                                  <Checkbox className='attend2' checked={attend2} onChange={handleAttend2Change} />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="center">2차시</TableCell>
                                <TableCell align="center">
                                  <Checkbox className='grade1' checked={grade1} onChange={handleGrade1Change} />
                                </TableCell>
                                <TableCell align="center">
                                  <Checkbox className='grade2' checked={grade2} onChange={handleGrade2Change} />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>

                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={closeAttend}>취소</Button>
                      <Button onClick={handleClose}>생성</Button>
                    </DialogActions>
                  </Dialog>


                <Dialog open={openGradeCre} onClose={closeGrade}>
                <DialogTitle>성적토큰 입력</DialogTitle>
                <DialogContent>
              
                <RadioGroup
                  row
                  aria-labelledby="demo-form-control-label-placement"
                  name="position"
                  defaultValue="homework"
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
                  <Box sx={{ maxWidth: 200 }}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={tokenList}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    isOptionEqualToValue={(option, value) => option.value === value.value && option.label === value.label}
                    renderInput={(params) => <TextField {...params} label="발행 리스트" />}
                    onChange={handleTokenChange}
                  />
                  </Box>
                  <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="점수입력"
                  type="email"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setScore(e.target.value);
                  }}                
                />
                 <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="내용입력"
                  type="email"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setContents(e.target.value);
                  }}                
                />

              </DialogContent>
              <DialogActions>
                <Button onClick={closeGrade}>취소</Button>
                <Button onClick={() => submitToken()}>생성</Button>
              </DialogActions>
            </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
