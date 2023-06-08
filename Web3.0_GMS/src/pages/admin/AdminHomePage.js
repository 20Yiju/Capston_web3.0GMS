import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import ReactDOM from 'react-dom/client';

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
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { AdminListHead, AdminListToolbar } from '../../sections/@dashboard/admin';
import AdminStudentListPage from './AdminStudentListPage';
// mock
import axios from 'axios';
//import ReactDOM from 'react-dom/client';
// ----------------------------------------------------------------------

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
  const [list, setCourseList] = useState([]);

  useEffect(() => {
    axios.get('/a_dashboard/a_home').then((response) => {
        setCourseList(response.data)
      });
  }, []);

  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openForCreate, setForCreate] = React.useState(false);

  const [openForEdit, setForEdit] = React.useState(false);

  // 강의 개설
  const [id, setId] = useState("12345");
  const [email, setEmail] = useState("12345@handong.edu");
  const [courseName, setCourseName] = useState("");
  const [section, setSection] = useState(0);
  const [year, setYear] = useState(0);
  const [semester, setSemester] = useState("");
  const [day, setDay] = useState("");

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const createCourse = () => {
    axios.post('/a_dashboard/a_homeSet', {
      id,
      email,
      courseName,
      section,
      // year,
      semester,
      day
    }).then(() => {
      alert("새로운 강의가 개설되었습니다.");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
    handleClose();
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const goSyllabus = () => {
    // navigate("/dashboard/profile");
  };
  // 
  const goStudentList = (courseName, section) => {
    navigate(`/a_dashboard/a_studentlist?courseName=${courseName}section=${section}`);
    //student_list();
  };
  const goFixContent = () => {
    // navigate("/dashboard/ranking");
  };

  


const [popup, setPopup] = React.useState(false);

const handleClickOpen = () => {
  setPopup(true);
};

const handleClose = () => {
  setPopup(false);
};

  return (
    <>
      <Helmet>
        <title> Admin Home </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Admin Home
          </Typography>
          <Button variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />} onClick= {handleClickOpen} > 
            등록하기
          </Button>
          <Dialog open={popup} onClose={handleClose}>
          <DialogTitle>과목 등록하기</DialogTitle>
          <DialogContent>
            <DialogContentText>
              새로운 과목을 추가해 주세요:D
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="class"
              label="과목명"
              type="class"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setCourseName(e.target.value);
              }} 
            />
            <TextField
              autoFocus
              margin="dense"
              id="time"
              label="분반"
              type="year"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setSection(e.target.value);
              }} 
            />
            <TextField
              autoFocus
              margin="dense"
              id="time"
              label="년도"
              type="year"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setYear(e.target.value);
              }} 
            />
            <TextField
              autoFocus
              margin="dense"
              id="classroom"
              label="학기"
              type="semester"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setSemester(e.target.value);
              }} 
            />
            <TextField
              autoFocus
              margin="dense"
              id="schedule"
              label="요일"
              type="day"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDay(e.target.value);
              }} 
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={createCourse}>등록</Button>
          </DialogActions>
        </Dialog>

        </Stack>

        <Card>
          <AdminListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          {/* 변화를 줄 요소 */}
          <Scrollbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>과목명</TableCell>
                    <TableCell align='center'>분반</TableCell>
                    <TableCell align='center'>요일</TableCell>
                    <TableCell align='center'>강의 계획서</TableCell>
                    <TableCell align='center'>수강 학생</TableCell>
                    <TableCell align='center'>수정</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((row) => (
                    <TableRow>
                      <TableCell align='center'>{row.courseName}</TableCell>
                      <TableCell align='center'>{row.Section}</TableCell>
                      <TableCell align='center'>{row.day_of_week}</TableCell>
                      <TableCell align='center'>
                        <Button onClick={goSyllabus}>확인</Button>
                      </TableCell>
                      <TableCell align='center'>
                        <Button onClick={() => goStudentList(row.courseName, row.Section)}>확인</Button>

                      </TableCell>
                      <TableCell align='center'>
                        <Button onClick={goFixContent}>확인</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          {/* 변화가 끝나는 부분 */}
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
