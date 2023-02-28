
import { Grid } from "@mui/material"
import { getProviders } from "next-auth/react"
import Login_component from "./login_component"

export default async () => {
  const providers = await getProviders()
  console.log("Providers", providers)
  
  return(
    <div style={{alignItems: "center"}}>
      
 
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
           
            <Login_component name={provider.name} id={provider.id}/>
          </div>
          
        ))}
  
     
    </div>

  )
}
