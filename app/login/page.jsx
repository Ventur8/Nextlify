
import { Grid } from "@mui/material"

import Login_component from "./login_component"

export default async () => {

  
  return(
    <div style={{alignItems: "center"}}>
      
 
        {Object.values(providers).map((provider) => (
          <div key={Spotify}>
           
            <Login_component name={Spotify} id={spotify}/>
          </div>
          
        ))}
  
     
    </div>

  )
}
