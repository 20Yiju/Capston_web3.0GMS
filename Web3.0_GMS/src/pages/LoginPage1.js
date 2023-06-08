import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link as MuiLink, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
// import Logo from '../components/logo/user';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import { useNavigate } from 'react-router-dom';
import GoogleButton from '../login/googleLogin';
import RadioGroup from './radio/RadioGroup';
import Radio from './radio/Radio'
import axios from 'axios';
import { Link } from 'react-router-dom';



// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const navigate = useNavigate();
  
  const mdUp = useResponsive('up', 'md');

  // const handleOpenUser = () => {
  //   navigate("/dashboard/home");
  // };
  // const handleOpenAdmin = () => {
  //   navigate("/a_dashboard/a_home");
  // };


  // 구글 로그인 관련 변수 선언
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [value, setValue] = useState("0");


  const handleOpenStart = (enter) => {
    // 학생일 경우
    if (enter === "0") {
      axios.get('/login/student').then((response) => {
        const userList = response.data;
        // DB에 담겨 있는 email 정보들
        const emailList = userList.map((user) => user.emailStudent);
        // 로그인 시도를 하는 email
        const tryEmail = userInfo.email;
        
        // DB에 저장된 계정과 일치하는 계정이 나타날 경우
        if (emailList.includes(tryEmail)) {
          <Link to={{pathname: '../_mock/account.js', state: {data: userInfo}}} />
          navigate("/dashboard/home");
        } else {
          alert("존재하지 않는 계정입니다!");
          // 존재하지 않는 계정일 경우 윈도우 새로고침
          window.location.reload();
        }
      });
    // 교수님일 경우
    } else {
      axios.get('/login/professor').then((response) => {
        const userList = response.data;
        // DB에 담겨 있는 email 정보들
        const emailList = userList.map((user) => user.emailProf);
        // 로그인 시도를 하는 email
        const tryEmail = userInfo.email;

        // DB에 저장된 계정과 일치하는 계정이 나타날 경우
        if (emailList.includes(tryEmail)) {
          <Link to={{pathname: '../_mock/AdminAccount.js', state: {data: userInfo}}} />
          navigate("/a_dashboard/a_home");
        } else {
          alert("존재하지 않는 계정입니다!");
          // 존재하지 않는 계정일 경우 윈도우 새로고침
          window.location.reload();
        }
      });
    }
  };
  
  return (
    <>
      <Helmet>
        <title> Login | TOMATO </title>
      </Helmet>

      <StyledRoot>
        {/* <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        /> */}

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back :{')'}
            </Typography>
            <img src="../../assets/logo/mainLogo.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to TOMATO
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <MuiLink variant="subtitle2">Get started</MuiLink>
            </Typography>

            {/* Google 로그인 버튼 */}      
            <article>
              <header>
                <h3>구글 로그인 그룹화 테스트</h3> 
              </header>
              <fieldset>
                  <>
                      {!isLogin
                          ? <GoogleButton setUserInfo={setUserInfo} setIsLogin={setIsLogin} />
                          : handleOpenStart(value)
                      }
                   </>
                  <RadioGroup value={value} onChange={setValue}>
                        <Radio value="0">학생</Radio>
                        <Radio value="1">교수</Radio>
                    </RadioGroup>
                    <footer>{value}를 선택하셨습니다.</footer>
                </fieldset>
            </article>


            <Stack direction="row" spacing={2}>
              {/* <Button fullWidth size="large" color="inherit" variant="outlined" >
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button> */}

              {/* <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleOpenUser}>
                사용자
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleOpenAdmin}>
                관리자
              </Button> */}
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
