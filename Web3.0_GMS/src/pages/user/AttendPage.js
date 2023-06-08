// 서버 AttendPage.js
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import {
    Stack,
} from '@mui/material';
import { useState, useEffect } from 'react';
import './AttendPage.css';
import '../Modal/AttendModal.css';
import ipfsClient from 'ipfs-http-client';
import { getTokenURI } from '../../backend/getTokenURI';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import User from '../../shareInfo/userInfo';

export default function AttendPage() {
  const [modal, setModal] = useState(null);
  //const [weekInfo, setWeekInfo] = useState([]);
  //const [attend1, setAttend1] = useState([]);
  //const [attend2, setAttend2] = useState([]);
  const [attendData, setAttendData] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseName = searchParams.get('courseName');
  const user = User.getInstance();
  const account = user.account;

  const toggleModal = (index) => {
  setModal(modal === index ? null : index);
  }
 // let attendUris = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uris = await getTokenURI(account);
        console.log('Token URIs:', uris);
	const attendData = [];
	for(let i = 0; i < uris.length; i++) 
	{
		const response_uris = await fetch(uris[i]);
		const data_uris = await response_uris.json();
		const isAttend = data_uris.attributes.find(attr => attr.trait_type === 'type');
		//console.log('isAttend: ', isAttend.value);
		if(isAttend.value === 'attend')
		{
			attendData.push(data_uris);
			//console.log("attend data exist!!");
		}

	}
	
	setAttendData(attendData);

	console.log('Attend Data:', attendData);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [courseName]);

const attend = "orangetoken";
return (
  <>
    <Helmet>
      <title>Attendance</title>
    </Helmet>
    <h2>{courseName} 출석페이지</h2>

    <Stack direction="row" alignItems="center" spacing={4}>
      <div className="event-year">
        <Calendar />
      </div>
      {attendData.map((data, index) => {
        const attend1 = data.attributes.find(attr => attr.trait_type === 'attend1').value;
        const attend2 = data.attributes.find(attr => attr.trait_type === 'attend2').value;
	let attendClass = '';

        if (attend1 === '출석' && attend2 === '출석') {
          attendClass = 'bluetoken';
        } else if (attend1 === '결석' && attend2 === '출석') {
          attendClass = 'orangetoken';
        } else if (attend1 === '출석' && attend2 === '결석') {
          attendClass = 'orangetoken';
        } else if (attend1 === '출석' && attend2 === '지각') {
          attendClass = 'yellowtoken';
        } else if (attend1 === '지각' && attend2 === '출석') {
          attendClass = 'yellowtoken';
        } else if (attend1 === '지각' && attend2 === '지각') {
          attendClass = 'orangetoken';
        } else if (attend1 === '지각' && attend2 === '결석') {
          attendClass = 'redtoken';
        } else if (attend1 === '결석' && attend2 === '지각') {
          attendClass = 'redtoken';
        } else if (attend1 === '결석' && attend2 === '결석') {
          attendClass = 'redtoken';
        }
        return (
          <div className={ attendClass } onClick={() => toggleModal(index)} key={index}>
            <h2 className="tokenTitle">{data.attributes.find(attr => attr.trait_type === 'weekInfo').value}</h2>
            {modal === index && (
              <div className="modal">
                <div className="overlay" />
                <div className="modal-content">
                  <h2>{data.attributes.find(attr => attr.trait_type === 'weekInfo').value}</h2>
                  <p>1차시: {data.attributes.find(attr => attr.trait_type === 'attend1').value}</p>
                  <p>2차시: {data.attributes.find(attr => attr.trait_type === 'attend2').value}</p>
                </div>
                <button className="close-modal" onClick={() => setModal(null)}>
                  Close
                </button>
              </div>
            )}
          </div>
        );
      })}
    </Stack>
  </>
);

}
