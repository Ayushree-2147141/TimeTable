const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const cors=require('cors');
app.use(cors({
    orgin: "*",
}))


app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

var connection = require('./database');



//main page
app.get('/index', function(req, res){
    res.sendFile(__dirname+'/index.html')
})

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html')
})

//display list of teachers
app.get('/teachers', function(req, res){
    res.sendFile(__dirname + '/teachers.html');
});

//display list of courses
app.get('/department', function(req, res){
    res.sendFile(__dirname + '/department.html');
});


//display teachers
app.get('/getteachers',(req, res)=>{
let sql = 'SELECT * FROM teachers';
connection.query(sql, function(err,results){
    if(err) throw err;
    res.send(results);
})
})

//display teacher for particular id
app.get('/getteachers/:id',(req, res)=>{
    let sql = `SELECT * FROM teachers where teacherID = ${req.params.id}`;
    connection.query(sql, (err,results)=> {
        if(err) throw err;
        res.send(results);
        console.log('Results fetched');
    })
});

app.get('/delete/teachers/:id',function(req, res){
    var id = req.params.id;
    let sql = `Delete FROM teachers WHERE teacherID = ? `;
    connection.query(sql, [id], (err,results)=>{
        if(err) throw err;
        console.log('Deleted teacher!');
        res.sendFile(__dirname+'/teachers.html')
    })
})

//display teachers
app.get('/getdepartment',(req, res)=>{
    let sql = 'SELECT * FROM department';
    connection.query(sql, function(err,results){
        if(err) throw err;
        res.send(results);
    })
    })
    
//display department for particular id
app.get('/getdepartment/:id',(req, res)=>{
    let sql = `SELECT * FROM department where deptId = ${req.params.id}`;
    connection.query(sql, (err,results)=> {
        if(err) throw err;
        res.send(results);
        console.log('Results fetched');
    })
});



//POST methods
//add teachers to DB
app.post('/addTeachers',function(req, res) {
    // console.log(req.body);
    var fname = req.body.teacherFirstName;
    var lname = req.body.teacherLastName;
    var address = req.body.teacherAddress;
    var tDeptId = req.body.teacherDeptId;
    var shortName = req.body.teacherShortName;

    // let sql = "INSERT INTO teachers(teacherFirstName, teacherLastName, teacherAddress) VALUES('"+fname+"','"+lname+"','"+address+"')";
    let sql = "INSERT INTO teachers(teacherFirstName, teacherLastName, teacherAddress,teacherDeptId, teacherShortName ) VALUES(?, ?, ?, ?, ?)";
    connection.query(sql,[fname, lname, address, tDeptId, shortName], (err,results)=> {
        if(err) throw err;
        // res.send("Data inserted! "+results.insertId);
        res.sendFile(__dirname+'/teachers.html')
        
    })
});


//adding department
app.post('/addDepartment',(req, res)=>{
    var deptName = req.body.deptName;
    var deptAbbr = req.body.deptAbbr;

    let sql = "INSERT INTO department(deptName, deptAbbr) VALUES(?, ?)";
    connection.query(sql,[deptName, deptAbbr],(err,results)=>{
        if(err) throw err;
        // res.send("Data inserted"+results.insertId);
        res.sendFile(__dirname+'/department.html')
    })
    
})

//submit Course details
app.post('/submitCourse', (req, res)=>{
    var courseName = req.body.course;
    console.log(courseName);  
    // res.json({'courseName': courseName});
    res.sendFile(__dirname+'/selectTeachers.html');
})


//database connection
app.listen('3000', ()=>{
    console.log('Server started on port 3000 -> http://localhost:3000');
    connection.connect(function(err){
      if(err)  throw err;
        console.log('Database connected');
    })
});