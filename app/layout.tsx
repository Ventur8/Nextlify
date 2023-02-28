
'use client';
import MusicPlayerSlider from "./components/player";
import "./globals.css";

import AuthContext from "./authContext";
import { RecoilRoot } from "recoil";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout(
  
  
  {
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const showHeader = usePathname() === '/login' ? false : true;
  return (
    
    <AuthContext>
    <RecoilRoot>
    <html lang="en">
    
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
       
        {children}
        {
          showHeader? <footer>
          <div className="musicbox">
            <MusicPlayerSlider />
          </div>
        </footer> : null
        }
        
         
      
      </body>
      
    </html>
    </RecoilRoot>
    </AuthContext>
    
    
  );
}
export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}
