import {
  Card,
  Stack,
  Container,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import './GradePage.css';
import '../Modal/AttendModal.css';
import { getTokenURI } from '../../backend/getTokenURI';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import User from '../../shareInfo/userInfo';

export default function GradePage() {
  const [modal, setModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [gradeData, setGradeData] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseName = searchParams.get('courseName');
  const user = User.getInstance();
  const account = user.account;

  const toggleModal = (index) => {
    setModal(modal === index ? null : index);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uris = await getTokenURI(account);
        console.log('Token URIs:', uris);
        const gradeData = [];

        for (let i = 0; i < uris.length; i++) {
          const response_uris = await fetch(uris[i]);
          const data_uris = await response_uris.json();
          const isGrade = data_uris.attributes.find(attr => attr.trait_type === 'type');

          if (isGrade && (isGrade.value === 'homework' || isGrade.value === 'exam' || isGrade.value === 'quiz')) {
            gradeData.push(data_uris);
          }
        }

        setGradeData(gradeData);
        console.log('Grade Data:', gradeData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [courseName]);

  return (
    <>
      <Helmet>
        <title>Grade</title>
      </Helmet>
      <Container>
        <Typography variant="h4" gutterBottom>
	  {courseName} 성적 페이지
        </Typography>
      </Container>
<Stack direction="column" alignItems="left" spacing={5} >
      <Stack direction="row" alignItems="center" spacing={4}>
	  {gradeData.map((data, index) => {
  const tokenType = data.attributes.find(attr => attr.trait_type === 'type')?.value;
  if (tokenType === 'homework') {
    return (
      <div className={`homework`} onClick={() => toggleModal(index)} key={index}>
        <h2 className="tokenTitle">{data.attributes.find(attr => attr.trait_type === 'tokenName')?.value}</h2>
        {modal === index && (
          <div className="modal">
            <div className="overlay" />
            <div className="modal-content">
              <h2>{data.attributes.find(attr => attr.trait_type === 'tokenName')?.value}</h2>
              <p>점수: {data.attributes.find(attr => attr.trait_type === 'studentScore')?.value}/{data.attributes.find(attr => attr.trait_type === 'totalScore')?.value}</p>
              <p>comment: {data.attributes.find(attr => attr.trait_type === 'comment')?.value}</p>
            </div>
            <button className="close-modal" onClick={() => setModal(null)}>
              Close
            </button>
          </div>
        )}
      </div>
    );
  }
  return null; // Skip rendering if type is not 'homework'
})}

      </Stack>
	 <Stack direction="row" alignItems="center" spacing={4}>
	  {gradeData.map((data, index) => {
  const tokenType = data.attributes.find(attr => attr.trait_type === 'type')?.value;
  if (tokenType === 'exam') {
    return (
      <div className={'exam'} onClick={() => toggleModal(index)} key={index}>
        <h2 className="tokenTitle">{data.attributes.find(attr => attr.trait_type === 'tokenName')?.value}</h2>
        {modal === index && (
          <div className="modal">
            <div className="overlay" />
            <div className="modal-content">
              <h2>{data.attributes.find(attr => attr.trait_type === 'tokenName')?.value}</h2>
              <p>점수: {data.attributes.find(attr => attr.trait_type === 'studentScore')?.value}/{data.attributes.find(attr => attr.trait_type === 'totalScore')?.value}</p>
              <p>comment: {data.attributes.find(attr => attr.trait_type === 'comment')?.value}</p>
            </div>
            <button className="close-modal" onClick={() => setModal(null)}>
              Close
            </button>
          </div>
        )}
      </div>
    );
  }
  return null; // Skip rendering if type is not 'homework'
})}
</Stack>
 <Stack direction="row" alignItems="center" spacing={4}>	
	  {gradeData.map((data, index) => {
  const tokenType = data.attributes.find(attr => attr.trait_type === 'type')?.value;
  if (tokenType === 'quiz') {
    return (
      <div className={'quiz'} onClick={() => toggleModal(index)} key={index}>
        <h2 className="tokenTitle">{data.attributes.find(attr => attr.trait_type === 'tokenName')?.value}</h2>
        {modal === index && (
          <div className="modal">
            <div className="overlay" />
            <div className="modal-content">
              <h2>{data.attributes.find(attr => attr.trait_type === 'tokenName')?.value}</h2>
              <p>점수: {data.attributes.find(attr => attr.trait_type === 'studentScore')?.value}/{data.attributes.find(attr => attr.trait_type === 'totalScore')?.value}</p>
              <p>comment: {data.attributes.find(attr => attr.trait_type === 'comment')?.value}</p>
            </div>
            <button className="close-modal" onClick={() => setModal(null)}>
              Close
            </button>
          </div>
        )}
      </div>
    );
  }
  return null; // Skip rendering if type is not 'homework'
})}
</Stack>
	  </Stack>
    </>
  );
}

