import React, { useState} from 'react'
import './logreg.style.css'
import Loading from './loading'
import Navbar from '../../components/Header/Navbar'
import FooterSmall from '../../components/Footer/FooterSmall';
import '../../../node_modules/reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';

import Eye from '../../assets/Eye.png'
import Spinner from 'react-bootstrap/Spinner'
import {GoogleLogin} from 'react-google-login'

const LogReg =()=>{
  
  
  //states and handler for register
  const [emailR,setEmailR]=useState("");
  const [usernameR,setUsernameR] =useState("");
  const [passwordR,setPassWordR]=useState("");
  const [msgR,setmsgR]=useState("");
  const [togR,setTogR]=useState(true);
  const [loaderR,setLoaderR]=useState(false);
  let err=localStorage.getItem("err");
  localStorage.removeItem("err");
  async function register(e){
    e.preventDefault();
    setLoaderR(true);
        const response=await fetch('https://api.codedigger.tech/auth/register/',{
            method:"POST",
        headers:{
            "Content-Type":"application/json"
           },
        body:JSON.stringify({
            "email":emailR,
            "username":usernameR,
            "password":passwordR
        })
        })
        const data=await response.json();
          if(response.status===400){
             
            let msg="";
            if(data.email){
            msg=msg+data.email[0]+'\n';
            
            }
            if(data.username){
              msg=msg+data.username[0]+'\n';
             
            }
            if(data.password){
              msg=msg+data.password[0];
            }
            setmsgR(msg);
            
            
          }
          else if(response.status===201){
           
            setmsgR("Successful, verify your email");
           
          }
            setLoaderR(false);
    
  }
  async function handleGoogleSuccess(response){
    console.log("onSuccess");
    const c=await response.tokenId;
   // console.log(c);
    const resp=await fetch('https://api.codedigger.tech/social_auth/google/',{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          "auth_token":c,
         
      })
      })
      if(resp.status!==200){
        alert("error");
      }
      else{
        const data=await resp.json();
        //console.log(data);
        localStorage.setItem("creds",JSON.stringify({
     
          access:data.tokens.access,
          refresh:data.tokens.refresh,
          first:data.first_time,
          username:data.username
          
        }))
      if(data.first_time===true){

          window.location='/profile/:id'
         }
         else{
         window.location='/home'
         }
                
     
      }
    
  }
  function handleGoogleFail(response){
    console.log(response)
    alert("failed")
  }

  async function Sendagain(e){
    e.preventDefault();
    setLoaderR(true);
        const response=await fetch('https://api.codedigger.tech/auth/send-email/',{
            method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "email":emailR,
           
        })
        })
       
setLoaderR(false);
setmsgR("sent");

  }

  //states and handler for login
     const [usernameL,setUserNameL]=useState("");
     const [passwordL,setpasswordL]=useState("");
     const [msgL,setmsgL]=useState("");
     const [first,setFirst] =useState(false);
     const [togL,setTogL] =useState(true);
     const [loaderL,setLoaderL]=useState(false);
 
   async  function login(e){
      e.preventDefault();
      setLoaderL(true);
     const response= await fetch('https://api.codedigger.tech/auth/login/',{
          method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
         "username":usernameL,
         "password":passwordL
      })
      })
    if(response.status===200){
        setpasswordL("");
        setUserNameL("");
     setmsgL(`Hello, ${usernameL}`);
    const data=await response.json();
    console.log(data);
    
    localStorage.setItem("creds",JSON.stringify({
     
      access:data.tokens.access,
      refresh:data.tokens.refresh,
      first:data.first_time_login,
      username:usernameL
      
    }))
  
    if(data.first_time_login===true){

      window.location='/profile/:id'
     }
     else{
     window.location='/home'
     }            
 
   

   
      }
      else if(response.status==400){
      //  setmsgL("Invalid");
      const errorData=await response.json();
      let msg=""; 
      if(errorData.username){
           msg=msg+"Usernamr: "+errorData.username[0]+" ";
       }
       if(errorData.password){
        msg=msg+"Password: "+errorData.password[0];
    }

       setmsgL(msg);
      }
      else {
        const err=await response.json();
        setmsgL(err.error);
      }    
      
      setLoaderL(false);
    }
   

    
   
    const switchers = [...document.querySelectorAll(".switcher")];
    const [show,setShow]=useState(true);
switchers.forEach((item) => {
  item.addEventListener("click", function () {
    switchers.forEach((item) =>
      item.parentElement.classList.remove("is-active")
    );
    this.parentElement.classList.add("is-active");
  });
});
 
   
      setTimeout(()=>{setShow(false)},1000);
    

    return (
      <>
      <Navbar/>
      {
     err?
      
      
     <Popup open={true}>
      <div className="pops">{err}</div>
   </Popup>
     
    :<></>
     
   }
      <br></br>
      <div>
        {
          show?(<Loading/>):(<>
         
       <div className="ContBody">
      <section className="forms-section">
  <div className="forms">
    <div className="form-wrapper is-active">
      <button type="button" className="switcher switcher-login">
        Login
        <span className="underline"></span>
      </button>
        {loaderL?<Spinner className="loading-animation" animation="border"/>:
      <form className="form form-login">
        <fieldset>
          <legend>Please, enter your email and password for login.</legend>
          <div className="input-block">
            <label for="login-email">Username</label>
            <input onChange={(e)=>setUserNameL(e.target.value)} className="text-primary" id="login-email" type="text" required/>
          </div>
          <div className="input-block">
            <label for="login-password">Password</label>
           
            <input onChange={(e)=>setpasswordL(e.target.value)} id="login-password" className="text-primary" type={(togL)?"password":"text"} required></input>
           
            <span  class="field-icon toggle-password"><img src={Eye} onClick={e=>{
              e.preventDefault();
            setTogL(!togL)}} className="eye"></img></span>
          </div>
        </fieldset>
        <h6 className="errormsgs">{msgL}</h6>
        <button onClick={login} type="submit" className="btn-login">Login</button>
       <div  className="googlelogin">
       <GoogleLogin
        clientId="879021189199-7dj21idsu3mvo8qnup47vc3fntntegma.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFail}
        cookiePolicy={"single_host_origin"}
        icon={false}
        
        /></div><br></br><br></br>
        <button onClick={(e)=>window.location='/ForgPass'} className="btn-setPass">Forgot Password ?</button>
         </form>
     
            }
    </div>
    <div class="form-wrapper">
      <button type="button" className="switcher switcher-signup" onClick={()=>{
         const switchers = [...document.querySelectorAll(".switcher")];

         switchers.forEach((item) => {
           item.addEventListener("click", function () {
             switchers.forEach((item) =>
               item.parentElement.classList.remove("is-active")
             );
             this.parentElement.classList.add("is-active");
           });
         });
      }}>
        Register
        <span className="underline"></span>
      </button>
      {loaderR?<Spinner className="loading-animation" animation="border"/>:
      <form className="form form-signup">
      {((msgR==="")||(msgR!=="Successful, verify your email"))?<>
        <fieldset>
          <legend>Please, enter your email, username and password for sign up.</legend>
          <div className="input-block">
            <label for="signup-email">E-mail</label>
            <input value={emailR} onChange={(e)=>setEmailR(e.target.value)} id="signup-email" type="email" required/>
          </div>
          <div className="input-block">
            <label for="username">Username</label>
            <input value={usernameR} onChange ={(e)=>setUsernameR(e.target.value)} id="username" type="text" required/>
          </div>
          <div className="input-block">
            <label for="signup-password">Password</label>
            <input value={passwordR} onChange={(e)=>{setPassWordR(e.target.value)}} id="signup-password" type={(togR)?"password":"text"} required/>
            <span  class="field-icon toggle-password"><img src={Eye} onClick={e=>{
              e.preventDefault();
              setTogR(!togR)}} className="eye"></img></span>
          </div>
        </fieldset>
    <h6 className="errormsgs">{msgR}</h6>
        <button onClick={register} type="submit" className="btn-signup">Register</button></>
        :
        <>
        <h7 className="goodmsgs">{`We have sent you a verification link on ${emailR} .`}</h7><br></br><h7 className="goodmsgs">{`Please verify your email and move to login. \n If you haven't recieved any mail regarding this, click here to send again.`}</h7>
        <button className="goodmsgs" onClick={Sendagain}>Send again</button></>}
      </form>
}
    </div>
  </div>
</section>
        
      </div>
       <FooterSmall/></>)
      }
    </div>
   
    </>
    )     
    
}

export default LogReg