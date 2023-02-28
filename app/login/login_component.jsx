"use client";
import { Avatar, Button, Grid } from "@mui/material";
import { fontFamily } from "@mui/system";
import { signIn } from "next-auth/react";
import React from "react";
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500&display=swap');
</style> 

export default function Login_component(props) {
  
  return (
    <div style ={{  justifyContent: "center",display: "flex",marginTop:150}}>
      <div
        className="faded"
        style={{
          border: "1px solid yellow",
          height: "500px",
          borderRadius: "25px",
          width: "500px",
        
        }}
      >
        
        <Grid >
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              height: "25vh",
              alignItems: "center",
            }}
          >
            <label style={{ color: "white", fontSize: 20, marginRight: 10 }}>
              Inicia sesión con tu cuenta de spotify
              </label>
          </Grid>
          
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => signIn(props.id, {callbackUrl: "/"} )}
              style={{ color: "white", border: "0.5px dashed yellow",padding:10, borderRadius: 25 , width:400}}
            >
              {console.log(props.id)}
              
              Continuar con {props.name} 
              
              <img src="https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM" style={{height:50,paddingLeft:10}}/>
            </Button>
        
          </Grid>
        </Grid>
      </div>
    </div>
    
  );
}