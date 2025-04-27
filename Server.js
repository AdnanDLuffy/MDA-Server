const express = require("express");
const app = express();
const morgan = require("morgan");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { exec , spawn} = require("child_process");
const fs = require("fs")
const path = require("path");
const UserData = require("./models/model");
const OS = require("os");
const Sport = require("./port")
const { stdout, stderr } = require("process");
const ngrok = require("ngrok")
const UserName = OS.userInfo().username

const runningDevice = `${OS.platform()}`+` ${OS.arch()}`
const HostName = `${OS.hostname()}`
const readLine = require("node:readline")

let UserArray = false;

console.warn(`Assalamualaikum! Brother/Sister,
---Please Check before going ahead---


You guys already know the purpose of this program ! But one thing you should know that you can just add a little bit of code here and there to run your backend things here ! But the main thing is Default MongoDB cluster AuthToken which i am providing Anyone can access it , so if your server is running some big stuffs please use your own AuthToken ! Otherwise there is no need ! 

For this you don't need to add any extra code just write it down in the next phase ... 
Good Luck ! And if you are a Dev ... and want to help with this project than visit @AdnanDLuffy on github

--- Stay Connected with me for more update ----

--- Assalamualaikum ---

`)
const RL = readLine.createInterface({
    input:process.stdin,
    output:process.stdout,
})





const WrMsge = [
    {Msge:`  Registration Completed `,
    Class:"wr",
    Mark:'✓',
    },
    {Msge:`Email Already in use `,
    Class:"wR",
    Mark:'⨯',
    },
    {Msge:`Password or Email didn't match`,
    Class:"wR",
    Mark:'⨯',
    },
    {Msge:`An Running Server Detected!
    `,
    Class:"wR",
    Mark:'⨯',
    },
    {Msge:`Username Already in use
    `,
    Class:"wR",
    Mark:'⨯',
    },
    {Msge:`Didn't find any account
    `,
    Class:"wR",
    Mark:'⨯',
    },
    {Msge:`Are you sure ?
    `,
    Class:"wR",
    Mark:'⨯',
    },
];

let ID = "mongodb+srv://NodeDB:asdf1234@cluster0.cbnst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
let port = Number(Sport);
let MongoAcc = false;
let sq1 = false;


RL.question(`Do you wanna change settings?{Default will be set}(y/n)   :`,(info=>{
    if (info ==='y') {
        s();
    }
    else {
        s3()
    }
}))

function s() {
    

RL.question(`Please enter and port number?(default:3000)  :`,(info)=>
{
 port = Number(info);
 if(port === 0 || port === NaN || port === ""){
    port = 3000;
    const PORTDATA = `module.exports = ${Number(port)}`
    fs.writeFile("./port.js",PORTDATA,(error)=>{
        if(error){
            console.log(error)
        }
        console.log(`Port changed to ${port}`)
    })

    setTimeout(()=>{
    sq1 = true ;
    console.log(`Changing Port to ${port}`); 
    if(sq1 === true) {
        s2()
    } 
    },3000)
   
 }
 else{
    console.log(`Changing Port to ${port}`);
    const PORTDATA = `module.exports = ${Number(port)}`
    fs.writeFile("./port.js",PORTDATA,(error)=>{
        if(error){
            console.log(error)
        }
        console.log(`Port changed to ${port}`)
    })
    setTimeout(()=>{
    sq1 = true ;
    
    if(sq1 === true) {
        s2()
    }  
    },3000)
    
 }

  
})

function s2() {
    RL.question(`Do your have mongoDB Account?(y/n =>{default:no})  :`,(info)=>{
    if (info === 'y') {
      MongoAcc = true;
      sf();   
    }
    else {
        console.log("Okh .. Using default AuthToken....")
        console.log("Please bear in mind if the database memory becomes full you may see error while login or registering ...")
        s3()
    }
       
})
}



function sf() {
    if (MongoAcc) {
        RL.question(`Please Provide an AuthToken    :`,(info)=>{
            ID = info;
        if(ID === null || ID === "" || ID === undefined) {
               ID =  `mongodb+srv://NodeDB:asdf1234@cluster0.cbnst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
               console.log("Since you didn't provide any Token we are using default one");
               s3(); 
            }
            else {
                ID = info;
                s3()
            }
        })
    }
}
}



function s3 () {
    

mongoose.connect(ID)
.then(()=>{
    console.log("Connected to DataBase")
    app.listen(port,"localhost",() =>{
    console.log(`Listening localhost:${port}`)
    console.log(`Visit http://localhost:${port}/Login to start your server`);
    if(OS.platform()==='linux') {
         exec("npm run server",(error,stdout,stderr)=>{
        console.log("Host Linux Detected ..... ")
        console.log("launching App")
        if(error){
            console.log(error)
        }
        console.log(`${stdout}`)
        console.log(`${stderr}`)
        })
    }
   
})
})
.catch((error)=>{
    console.log(error)
})
app.use(express.static("files"));
app.use(morgan("dev"));

app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"files"))

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"files"))

const Nothing = "";
let UserInfo = "";
let UserAuth = "";
let linK = "Launch To See one"
let Url = "Launch to See one";
let Path = `/home/${UserName}/Music`
let Adder = `/Sample/`
Path = Path + Adder;
let PaTH = "";
app.post("/DashBoard/Setup/:Option",(req,res)=>{
    const Option = req.params.Option;
    const UserInput = req.body;
   if (Option === 'Ngrok') {
    if (UserInfo.Email === UserInput.email && UserInfo.Password === UserInput.pass ) {
        const auth = UserInput.auth;
     ngrok.authtoken(`${auth}`)
     .then(
     ()=>{
         ngrok.connect(port)
         .then((url)=>{
             Url = url;
             res.redirect("/DashBoard")
         })

         
     }
     )
     }
    }
    else if (Option === "Serveo") {
        
        if(UserInfo.Email === UserInput.email && UserInfo.Password === UserInput.pass ) {
            const sitename = UserInput.SiteName;
            const command = spawn("ssh",["-R",`${sitename}:80:localhost:${port}`,"serveo.net"])
            command.stdout.on('data',(data)=>{
            linK = `https://${sitename}.serveo.net`;
            console.log(`${data}`)
         
        
        })
        setTimeout(()=>{
               res.redirect("/DashBoard");
        },5000);
        

    }

   

    }
 
 })



 app.post("/DashBoard/Stop/:Option",(req,res)=>{
    const Option = req.params.Option;
    const UserInput = req.body;
   if (Option === 'Ngrok') {
    if (UserInfo.Email === UserInput.email && UserInfo.Password === UserInput.pass ) {
        
     
         ngrok.disconnect()
         .then(()=>{
             Url = "Ngrok Stopped... Press Launch";
             res.redirect("/DashBoard")
         })

         
     }
     
     
    }
    else if (Option === "Serveo") {
     console.log("run")
    }
 
 })


let Alu = false;


app.post("/Login",(req,res)=>{
    const id = req.body.id;
    const pass = req.body.pass;
    if (!UserArray) {
         UserData.findOne({'Email':`${id}`})
    .then(info=>{
 
       UserArray = info;
       console.log(UserArray);
       if(UserArray.Password !== pass && UserArray.Email !== id ){
        
        res.render("Login",{Message:WrMsge[2]});
       }
       else if (UserArray === null) {
        res.render("Login",{Message:WrMsge[5]});
       }
       else if (UserArray.Password === pass && UserArray.Email === id ){
        UserInfo = UserArray;
        UserAuth = true;
        Path = UserInfo.Path;
        Alu = true;
        AluCheck();
        res.redirect("/DashBoard")
       }

    })
    }
    else {
        if(UserArray.Password === pass && UserArray.Email === id ){
            UserInfo = UserArray;
            UserAuth = true;
            Path = UserInfo.Path;
            Alu = true;
            AluCheck();
            res.redirect("/DashBoard")
        }
        else {
            res.render("Login",{Message:WrMsge[5]});
        }
    }
   
})


// Now This part is for Settings Page 

app.post("/DashBoard/Change/:WK",(req,res)=>{
    const wk = req.params.WK;
    const PASS = req.body.pass;
    const MAIL = req.body.email;
    const CHANGER = req.body.SiteName;
    
    if (wk === 'pass') {
        if (UserInfo.Email === MAIL && UserInfo.Password === PASS) {
            UserData.findOneAndUpdate({"Email":MAIL},{$set:{"Password":CHANGER}})
            .then(info=>{
                console.log(`Password Changed`)
                UserInfo = undefined;
                UserAuth = false ;
                res.redirect("/Admin-Settings")
            })
            .catch(error=>{
                console.log(error)
            })
        }
        else {
            res.redirect("/Admin-Settings")
        }
    }

    if (wk === 'name') {
        if (UserInfo.Email === MAIL && UserInfo.Password === PASS) {
            UserData.findOneAndUpdate({"Email":MAIL},{$set:{"Name":CHANGER}})
            .then(info=>{
                UserInfo = undefined;
                UserAuth = false;
                console.log(`Name Changed`)
                res.redirect("/Admin-Settings")
            })
            .catch(error=>{
                console.log(error)
            })
        }
        else {
            res.redirect("/Admin-Settings")
        }
    }

    if (wk === 'username') {
        if (UserInfo.Email === MAIL && UserInfo.Password === PASS) {
            UserData.findOneAndUpdate({"Email":MAIL},{$set:{"Username":CHANGER}})
            .then(info=>{
                UserInfo = undefined;
                UserAuth = false;
                console.log(`Username Changed`)
                res.redirect("/Admin-Settings")
            })
            .catch(error=>{
                console.log(error)
            })
        }
        else {
            res.redirect("/Admin-Settings")
        }
    }

    if (wk === 'path') {
        if (UserInfo.Email === MAIL && UserInfo.Password === PASS) {
            UserData.findOneAndUpdate({"Email":MAIL},{$set:{"Path":CHANGER}})
            .then(info=>{
                UserInfo = undefined;
                UserAuth = false;
                console.log(`Path Changed`)
                res.redirect("/Admin-Settings")
            })
            .catch(error=>{
                console.log(error)
            })
        }
        else {
            res.redirect("/Admin-Settings")
        }
    }

    if (wk === 'email') {
        if (UserInfo.Email === MAIL && UserInfo.Password === PASS) {
            UserData.findOneAndUpdate({"Email":MAIL},{$set:{"Email":CHANGER}})
            .then(info=>{
                UserInfo = undefined;
                UserAuth = false;
                console.log(`Email Changed`)
                res.redirect("/Admin-Settings")
            })
            .catch(error=>{
                console.log(error)
            })
        }
        else {
            res.redirect("/Admin-Settings")
        }
    }




})



app.get("/Admin-Settings",(re1,res)=>{
    if(UserInfo) {
    res.render("Dash-Settings",{UserInfo}) }
    else {
        res.redirect("/Login");
    }
})


app.get("/Login",(req,res)=>{
    res.render("Login",{Message:""});
})

AluCheck();
function AluCheck() {
    

if(Alu){

const Hilu = Path;
app.use(express.static(Path))

        const newpath = Path.split("/")
        newpath.splice(0,1)
        newpath.splice(-1,1)
        let NewPath ="";   
        let newPath ="";
        newpath.forEach(value=>{
        newPath += `/${value}`;
        })

        NewPath = newPath;
        PaTH = NewPath;
        app.use(express.static(NewPath))
        app.use(express.static(Hilu))
        app.set("views",[
        path.join(__dirname,"files"),
        NewPath,
        Path,
        Path+"Views",
        NewPath+"/Views" ,
        
        //If you want to use Other Name plese add it here
        ])

}
}

app.get("/",(req,res)=>{
    res.render("index",{Nothing},((error,file)=>{
        if(error) {
            res.render("Index",{Nothing},(Err,File)=>{
                if (Err) {
                    res.sendFile(`${Path}/index.html`,(Error,FILE)=>{
                        if (Error) {
                            res.sendFile(`${Path}/Index.html`,(ERROR,FiLE)=>{
                                if(error){
                                    res.render("ServerError")
                                    return;
                                }
                                res.sendFile(FiLE);
                            })
                            return;
                        }
                        res.sendFile(File)
                })
                return;
                }
            res.send(File)
            })
            return;
        }
        else {
           res.send(file) 
        }
        
    }));
})


console.log(UserInfo);
app.post("/Registration",(req,res)=>{

    if(!UserAuth) {
        const userData = new UserData ({
            _id:req.body.username,
            Name:req.body.name,
            Username:req.body.username,
            Email:req.body.email,
            Password:req.body.pass,
            Path:req.body.path,
            runningDevice:runningDevice,
            HostName  : HostName  ,
        
        
            })
            
            UserData.findById(req.body.username)
            .then(info=>{
                const UserArray = info;
                if (UserArray) {
                    res.render("Registration",{Message:WrMsge[4]});
                }
                else {
                    UserData.findOne({'Email':`${req.body.email}`})
                    .then(data=>{
                      
                      const  UserArray2 = data;
                       
                    if (UserArray2) {
                        res.render("Registration",{Message:WrMsge[1]});
                    }
                    else {
                    userData.save()
                    .then (()=>{
                        res.render("Registration",{Message:WrMsge[0]});
                    })
                    }
                     
                    })
                }
            })
    }
    else {
        res.render("Login",{Message:WrMsge[3]});
    }
   
})

app.get("/Registration",(req,res)=>{
    if (!UserInfo)
    {
        res.render("Registration",{Message:""});
    }
    else {
        res.render("Login",{Message:WrMsge[3]});
    }
    
})
app.get("/DashBoard/Logout",(req,res)=>{
    UserAuth = false;
    res.redirect("/DashBoard")
})
app.get("/DashBoard",(req,res)=>{
    if (!UserAuth){
        res.redirect("/Login")
    }
    else 
    {
       res.render("DashBoard",{UserInfo,links:Url,Link:linK,port});  
    }
   
})

app.get("/Show",(req,res)=>{
    UserData.find()
    .then(info=>{
        res.send(info)
    })
})

app.get("/Delete/:username",(req,res)=>{
    UserData.findOneAndUpdate('Name')
    UserData.findByIdAndDelete(`${req.params.username}`)
    .then(info=>{
        res.send(info)
    })
})
app.use((req,res,next)=>{
    const Req = req.path;
    const addrr = Req;
   
    let link = Req.split("/");
    link = link.splice(-1,1);
    let link1 = link[0];
    let CheCker = link1.split(".")
    const type = CheCker[1]; 

    if(type === 'html') {
        const PATH = PaTH + `${addrr}`;
       
        res.sendFile(PATH) 
        }
        else if(type === 'doc') {
            const PATH = PaTH + `${addrr}`;
           
            res.sendFile(PATH) 
            }
        else if(type === 'js') {
                const PATH = PaTH + `${addrr}`;
               
                res.sendFile(PATH) 
            }
        else if(type === 'css') {
                const PATH = PaTH + `${addrr}`;
               
                res.sendFile(PATH) 
            }
        else if(type === 'json') {
                const PATH = PaTH + `${addrr}`;
               
                res.sendFile(PATH) 
            }
        else if(type === 'md') {
                const PATH = PaTH + `${addrr}`;
               
                res.sendFile(PATH) 
            }
        else if(type === 'json') {
                const PATH = PaTH + `${addrr}`;
               
                res.sendFile(PATH) 
            }                      
    
        else if (type === undefined ) {
            
        res.render(link1,{info:"HelllOWord"},(error,file)=>{
        if (error) {

        res.render("ServerError")    
        }
        res.send(file);
        })

        }



   
    
    next();


})



}
