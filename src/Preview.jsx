import React, { Fragment } from 'react';
import { useSelector } from "react-redux";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
 label:{
    paddingBottom: "15px"
 },
 pRight:{
    paddingRight:"5px",
 },
 box:{
    backgroundColor:"#80808057", 
    borderRadius:"20px",
 },
 container:{
     border:"1px solid black", 
     borderRadius:"4px", 
     padding:"30px"
    },
header:{
    textAlign:"center", 
    fontWeight:"bold", 
    paddingBottom:"15px", 
    fontSize:"25px",
},
edit:{ 
    backgroundColor:"#4270f3b3", 
    borderRadius:"10px", 
    padding:"5px", 
    cursor:"pointer",
},
flexPadding:{
    display:"flex", 
    paddingBottom:"10px",
}

}));

function Preview(props) {

const classes = useStyles();
const form = useSelector(state => state);
const labelGrid=(val)=>{
    return(
             <Grid item xs={6} sm={1} className={classes.label}>
                {val} 
            </Grid>);
}

const arrayContent=(val)=>{
let content=[];
val.map(function(iter, index){
    content.push(<div className={classes.flexPadding} ><div className={classes.pRight}>{index+1}.</div><div>{iter}</div></div>);
});
return content;
}
const skillsContent=(val)=>{
    let content=[];
    val.map(function(iter, index){
        if(index != (val.length -1))
        content.push(<Fragment className={classes.pRight}><div>{iter.title}</div><div>,</div></Fragment>);
        else
        content.push(<Fragment className={classes.pRight}><div>{iter.title}</div><div>.</div></Fragment>);

    });
    return <div style={{display:"flex"}}>{content}</div>;
    }
    const Space=()=>{return <Grid item xs={12} sm={12} style={{height:"15px",}}></Grid>}
  return (
    <Box p={4} className={classes.box}>
     <Grid container className={classes.container}>
     <Grid item xs={12} sm={12} style={{paddingBottom:"30px"}}>
     <Grid container>
     <Grid item xs={6} sm={10}>
     <div className={classes.header}>Resume Preview</div>
     </Grid>
     <Grid item xs={6} sm={2}>
     <span className={classes.edit} onClick={()=>{
              props.history.push("/");
            }}>Edit</span>
     </Grid>
     </Grid>  
     
     <Grid container>
            {labelGrid("Name")}
            <Grid item xs={6} sm={11}>
            {form.name}
            </Grid>

            {labelGrid("Email")}
            <Grid item xs={6} sm={11}>
            {form.email}
            </Grid>

            {labelGrid("Phone No.")}
            <Grid item xs={6} sm={11}>
            {form.phone}
            </Grid>

            {labelGrid("Address")}
            <Grid item xs={6} sm={11}>
            {form.address}
            </Grid>
            {Space()}
            {labelGrid("Education")}
            <Grid item xs={6} sm={11}>
            {arrayContent(form.edu)}
            </Grid>
            {Space()}
            {labelGrid("Experience")}
            <Grid item xs={6} sm={11}>
            {arrayContent(form.exp)}
            </Grid>
            {Space()}
            {labelGrid("Skills")}
            <Grid item xs={6} sm={11}>
            {skillsContent(form.skills)}
            </Grid>

    </Grid>
    </Grid>
    </Grid>
  </Box>
  );
}

export default Preview;
