import './App.css';
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
const axios = require('axios');

function App() {
  const fetch=(val)=>{
    console.log(val.target.value)
axios.get('https://6065a859b8fbbd0017566ffe.mockapi.io/test')
  .then(function (response) {
    console.log(response);
    let temp = response.data.filter(function(iter){
      return (iter.title.indexOf(val.target.value) > -1)
    })
    setOptions(temp);
   // setOptions(response)

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
 
  }
const [options, setOptions] =useState([]);
  return (
    <div style={{backgroundColor: "aliceblue", height:"100vh"}}>
       <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={options.map((option) => option.title)}
      
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            onChange={(e)=>{
              fetch(e);
            }}
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />

        {/* <HashRouter>
        <Route exact path="/" component={Resume} />
        <Route path="/preview" component={Preview} />
        </HashRouter> */}
     </div>
  );
}

export default App;
