import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop:"20px",
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  blockSpan:{
     position: "relative",
     padding: "10px",
     top: "-10px",
    },
  textArea:{
    width:"80%", 
    marginTop:"2px", 
    backgroundColor: "#d4d4d4",
    padding:"10px 0px 0px 10px",
    border: "1px",
  },
  addressTextArea:{
    width:"70%",
    marginTop:"15px", 
    backgroundColor: "#d4d4d4", 
    padding:"10px 0px 0px 10px",
    border: "1px",
  },
  cancel:{
    position: "relative",
    backgroundColor: "gray",
    padding: "1px 7px 4px 7px",
    top: "-10px",
    marginLeft: "5px",
    borderRadius: "20px",
    cursor:"pointer",
  },
  box:{
    backgroundColor:"#80808057", 
    borderRadius:"20px",
  },
  header:{
    textAlign:"center", 
    fontWeight:"bold", 
    paddingBottom:"15px", 
    fontSize:"25px",
  },
  container:{
    border:"1px solid black",
    borderRadius:"4px",
    padding:"30px",
  },
  address:{
    position: "relative",
    padding: "10px",
    top: "-10px",
  },
  addMore:{
    float:"right",
    marginRight:"40px",
    backgroundColor:"#4270f3b3",
    borderRadius:"10px",
    padding:"5px",
    cursor:"pointer",
  },
blockBox:{
  border:"1px solid black", 
  borderRadius:"10px", 
  paddingTop:"10px", 
  width:"90%",
},
button:{
  paddingTop:"20px", 
  paddingBottom:"20px", 
  textAlign:"center",
}
}));
const skills = [
{ title: 'React js', id:0 },
{ title: 'Node js', id: 1 },
{ title: 'Angular', id: 2 },
{ title: 'Redux', id:3 },
{ title: 'Typescript', id:4 },
{ title: "HTML", id: 5 },
{ title: 'CSS', id: 6 },
{ title: 'SQL', id: 7 },
{ title: 'Elixir', id: 8 }];

function Resume(props) {

const classes = useStyles();
const state = useSelector(state => state);
const dispatch = useDispatch();
const [eduCount, setEduCount]=useState(state.edu.length !== 0 ?  state.edu.length-1 : 0);
const [expCount, setExpCount]=useState(state.exp.length !== 0 ?  state.exp.length-1 : 0);
const [flag, setFlag]=useState(false);
const [form, setForm]=useState(state);
const submit=()=>{
  let error=0;
  let key=Object.keys(form);
  key.map(function(iter){
    if(iter !== "skills")
      if(form[iter].length === 0)
      error++
  });
  if(error > 0){
    setFlag(true);
  }
  else
  {
    dispatch({type:"FORM", payLoad:form});
    props.history.push("/preview");
  }
}
const block=(type, val, setVal)=>{
  let section=[];
  let placeholder = type=== "exp" ? "Enter Your Experience here" : "Enter Your Education here"
  let ar=[];
  for(let i=0;i<=val;i++){
    ar.push("");
    section.push(
      <div  style={{ paddingBottom:"25px"}}>
      <span className={classes.blockSpan}>
        {i+1}.
      </span>
      <TextareaAutosize aria-label="address" rowsMax={3} rowsMin={2} id={i}
      value={form[type][i]}
      onChange={(e)=>{
        let array=form[type];
        array[e.target.id]=e.target.value;
        setForm({...form, [type]:array});
      }}
      placeholder={placeholder}
      className={classes.textArea}
      style={{ borderBottom: (flag && (form[type][i] === undefined || form[type][i] === ""  )) ? "1px solid red" : "1px solid black"}}
      />
    <span 
      className={classes.cancel}
      id={i} onClick={(e)=>{
        let array=form[type];
        array.splice(e.target.id, 1);
        let info= {...form, [type]: array }
        setForm(info);
        if(val !== 0)
        setVal(val-1)
        }}>x</span>
      </div>
    );
  }
  return section;
}
  return (
    <Box p={4} className={classes.box}>
     <Grid container className={classes.container}>
     <Grid item xs={12} sm={12} style={{paddingBottom:"30px"}}>
     <div className={classes.header}>Resume</div>
     <Grid container>
            <Grid item xs={6} sm={3}>
            <TextField required id="name" label="Name" value={form.name} error={(flag && form.name === "")}
             onChange={(e)=>{
                  setForm({...form, name:e.target.value});
                }} 
            style={{width:"80%"}}/>
            </Grid>
            <Grid item xs={6} sm={3}>
            <TextField required id="email" label="Email" value={form.email} error={(flag && form.email === "")}
             onChange={(e)=>{
              setForm({...form, email:e.target.value});
            }} 
             style={{width:"80%"}}/>
            </Grid>
            <Grid item xs={6} sm={3}>
            <TextField required id="phone" label="Phone No." value={form.phone} error={(flag && form.phone === "")}
            style={{width:"80%"}} 
             onChange={(e)=>{
              setForm({...form, phone:e.target.value});
            }} 
            />
            </Grid>
            <Grid item xs={6} sm={3}>
            <span style={{color:(flag && form.address === "") ? "red":"black"}} className={classes.address}>Address*</span>
            <TextareaAutosize aria-label="address" rowsMax={3} value={form.address}
             onChange={(e)=>{
              setForm({...form, address:e.target.value});
            }} 
             rowsMin={2} placeholder="Enter your address here" 
             style={{borderBottom: (flag && form.address === "") ? "1px solid red" : "1px solid black"}} 
             className={classes.addressTextArea}
             />
            </Grid>
            </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
            <span style={{ padding:"5px"}}>Education</span>
            <span className={classes.addMore} onClick={()=>{
              setEduCount(eduCount+1);
            }}>Add more</span>
            <br />
            <br />
           <Box p={3} className={classes.blockBox}>
           {block("edu",eduCount, setEduCount)}
           </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
            <span style={{ padding:"5px"}}>Experience</span>
            <span className={classes.addMore} onClick={()=>{
              setExpCount(expCount+1);
            }}>Add more</span>
            <br />
            <br />
            <Box p={3} className={classes.blockBox}>
            {block("exp",expCount, setExpCount)}
           </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
            <div className={classes.root}>
               <Autocomplete
                  multiple
                  id="tags-standard"
                  options={skills}
                  value={form.skills}
                  onChange={(e, val)=>{
                    setForm({...form, skills:val});
                  }}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Skills"
                  />
                   )}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.button}>
            <div><Button color="primary" variant="contained" onClick={()=>{submit()}} style={{textTransform:"none"}}>Submit</Button></div>
            </Grid>
            </Grid>
  </Box>
  );
}

export default Resume;
