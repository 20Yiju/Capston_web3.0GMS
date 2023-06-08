const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;
const db = require('./config/db')
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors());
app.get('/', (req, res)=>{
    console.log('/root');
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 로그인 페이지 관련

app.get('/login/student', (req, res)=>{
    console.log('/login/student')
    db.query("SELECT * FROM Student", (err, data) => {
        if(!err) {
            console.log(data)
        }
        else {
            console.log(err)
        }
        res.send(data)
    })
})

app.post('/login/student/post', (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const department = req.body.department;
    const address = req.body.address;

    db.query("INSERT INTO TempStudent VALUES(?, ?, ?, ?)",
            [name, email, department, address], function(err, rows, fields) {
        if(!err) {
            console.log("DB저장 성공!!!");
            res.sendStatus(200);
        } else {
            console.log("DB저장 실패…");
            res.sendStatus(500);
        }
    });
});

app.get('/login/professor', (req, res)=>{
    console.log('/login/professor')
    db.query("SELECT * FROM Professor", (err, data) => {
        if(!err) {
            console.log(data)
        }
        else {
            console.log(err)
        }
        res.send(data)
    })
})

app.post('/login/professor/post', (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const department = req.body.department;
    const address = req.body.address;

    db.query("INSERT INTO TempProfessor VALUES(?, ?, ?, ?)",
            [name, email, department, address], function(err, rows, fields) {
        if(!err) {
            console.log("DB저장 성공!!!");
            res.sendStatus(200);
        } else {
            console.log("DB저장 실패…");
            res.sendStatus(500);
        }
    });
});

// 사용자 페이지 관련

app.get('/dashboard/home', (req, res)=>{
    // console.log('/dashboard/home')
    db.query("SELECT * FROM Course", (err, data) => {
        if(!err) {
            console.log(data)
        }
        else {
            console.log(err)
        }
        res.send(data)
    })
})

// 관리자 페이지 관련

app.get('/a_dashboard/a_home', (req, res)=>{
    // console.log('/a_dashboard/a_home')
    db.query("SELECT * FROM Teach", (err, data) => {
        if(!err) {
            console.log(data)
        }
        else {
            console.log(err)
        }
        res.send(data)
    })
})

app.get('/a_dashboard/a_tokenmanage/professor', (req, res) => {
    //console.log('/a_dashboard/a_tokenmanage/professor')
    db.query("SELECT walletAddress FROM Professor", (err, data) => {
        if(!err){
            //console.log(data);
        }
        else{
            console.log(err)
        }
        res.send(data)
    })
})

app.post('/a_dashboard/a_tokenmanage/submit/:id', (req, res)=>{
    const tokenId = parseFloat(req.params.id);
    const courseName = req.body.courseName;
    const section = req.body.section;
    const type = req.body.type;
    const tokenName = req.body.tokenName;
    // const submitNum = req.body.submitNum;
    const totalScore = req.body.totalScore;

    db.query("UPDATE TokenInfo SET courseName = ?, section = ?, type = ?, tokenName = ?, totalScore = ? WHERE tokenID = ?",
        [courseName, section, type, tokenName, totalScore, tokenId], function(err, rows, fields) {
        if(!err) {
            console.log("DB 가져오기 성공!!!");
            res.sendStatus(200);
        } else {
            console.log("DB 가져오기 실패…")
            console.log(err);
            res.sendStatus(500);
        }
    });
});

app.post('/a_dashboard/a_homeSet', (req, res)=>{
    const id = req.body.id;
    const email = req.body.email;
    const courseName = req.body.courseName;
    const section = req.body.section;
    const year = req.body.year;
    const semester = req.body.semester;
    const day = req.body.day;

    console.log('/a_dashboard/a_homeSet')
    db.query("INSERT INTO Teach VALUES(?, ?, ?, ?, ?, ?, ?, ?)", 
            [id, email, courseName, section, year, semester, day, null], function(err, rows, fields) {
        if(!err) {
            console.log("DB저장 성공!!!");
            res.sendStatus(200);
        } else {
            console.log("DB저장 실패…")
            res.sendStatus(500);
        }
    });
});

app.get('/a_dashboard/a_studentlist', (req, res)=>{
    // console.log('/a_dashboard/a_studentlist')
    db.query("SELECT * FROM TakeStudents", (err, data) => {
        if(!err) {
            console.log(data)
        }
        else {
            console.log(err)
        }
        res.send(data)
    })
})

app.get('/a_dashboard/a_studentlist/tokenList', (req, res)=>{
    // console.log('/a_dashboard/a_studentlist/tokenList')
    db.query("SELECT * FROM TokenInfo", (err, data) => {
        if(!err) {
            console.log(data)
        }
        else {
            console.log(err)
        }
        res.send(data)
    })
})

app.get('/a_dashboard/a_tokenmanage', (req, res)=>{
    console.log('/a_dashboard/a_tokenmanage')
    db.query("SELECT * FROM TokenInfo", (err, data) => {
        if(!err) {
            //console.log(data)
        }
        else {
            console.log(err)
        }
        res.send(data)
    })
})
app.post('/a_dashboard/a_tokenmanage', (req, res)=>{
    const courseName = req.body.courseName;
    const section = req.body.section;
    const type = req.body.type;
    const tokenName = req.body.tokenName;
    // const submitNum = req.body.submitNum;
    const totalScore = req.body.totalScore;

    console.log('/a_dashboard/a_tokenmanage')
    db.query("INSERT INTO TokenInfo (courseName, section, type, tokenName, totalScore) VALUES(?, ?, ?, ?, ?)", 
            [courseName, section, type, tokenName, totalScore], function(err, rows, fields) {
        if(!err) {
            console.log("DB저장 성공!!!");
            res.sendStatus(200);
        } else {
            console.log("DB저장 실패…")
            res.sendStatus(500);
        }
    });
});
app.delete('/a_dashboard/a_tokenmanage/:id', (req, res) => {
    const tokenId = req.params.id;
    console.log(`Delete Token ID : ${tokenId}`);
    db.query("DELETE FROM TokenInfo WHERE tokenID = ?", [tokenId], (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        //console.log(`Deleted Token ID : ${tokenId}`);
        res.sendStatus(200);
      }
    });
});
app.post('/a_dashboard/a_tokenmanage/update/:id', (req, res)=>{
    const tokenId = parseFloat(req.params.id);
    const courseName = req.body.courseName;
    const section = req.body.section;
    const type = req.body.type;
    const tokenName = req.body.tokenName;
    // const submitNum = req.body.submitNum;
    const totalScore = req.body.totalScore;

    db.query("UPDATE TokenInfo SET courseName = ?, section = ?, type = ?, tokenName = ?, totalScore = ? WHERE tokenID = ?", 
        [courseName, section, type, tokenName, totalScore, tokenId], function(err, rows, fields) {
        if(!err) {
            console.log("DB 수정 성공!!!");
            res.sendStatus(200);
        } else {
            console.log("DB 수정 실패…")
            console.log(err);
            res.sendStatus(500);
        }
    });
});


app.listen(PORT, ()=>{
    console.log(`Server On : http://localhost:${PORT}`)
})

app.get('/a_dashboard/a_studentlist/', (req, res) => {

	const courseName = req.query.courseName;
	const section = parseInt(req.query.section,10);

	console.log('courseName : '+courseName);
	console.log('section : '+section);


	db.query("SELECT * FROM TakeStudents WHERE courseName = ? AND section = ?",[courseName, section], function(err, rows, fields) {
		if(!err) {
			console.log("수강생 목록 가져오기 성공!!");
			res.send(rows);
		}
		else{
			console.log("수강생 목록 가져오기 실패");
			console.log(err);
			res.sendStatus(500);
		}
	});
});
