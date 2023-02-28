import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { signOut } from 'next-auth/react';
import spotifyApi,{ LOGIN_URL } from '../../../lib/spotify'




async function refreshAccesToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const {body:refreshedToken} = await spotifyApi.refreshAccessToken();
        console.log("refeshedToken es ",refreshedToken);

        return{
            ...token,
            accessToken: refreshedToken.access_token,
            accesTokenExpires: Date.now() + refreshedToken.expires_in * 1000,

            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        }
    } catch (error) {
        signOut();
        console.log(error);
        return{
            ...token,
            error:"RefreshTokenError"
        }
    }
}





export default NextAuth({
 
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages : {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token,account,user}){
            if(account && user){
             return{
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accesTokenExpires: account.expires_at * 1000
             };
            };
            if(Date.now() < token.accesTokenExpires) {
                console.log('Token no expirado');
                return token;
            };
            
            console.log('Token expirado');
            //La token expira
            return NextResponse.redirect('/login');
        },
       async session({session,token}){
           session.user.accessToken = token.accessToken;
           session.user.refreshToken = token.refreshToken;
           session.user.username = token.username;

            return session;
        }
    }
})