const handleRegister=()=>{
    const name = document.getElementById('registerName').value;
    const email= document.getElementById('registerEmail').value;
    const password= document.getElementById('registerPassword').value;
    const ckbox= document.getElementById('ckbox').checked;
    console.log(ckbox)
    if(!ckbox){
        return alert('Must agree trems')
    }
    if(password.length<6){
        return alert('Password must contain atleast 6 character')
    }
    // if(password!=reTypedPassword){
    //     return alert('ReTypedPassword is not matching with original')
    // }
    const data= {name,email,password}
    console.log(data);

    fetch('http://localhost:3000/adduser', {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
    })
    .then(res=>{
        console.log('response: ', res)
        if(res.status==200){
            alert('Registered successfully')
            setTimeout(()=>{
                window.location.href = 'index.html'
            },0)
            
        }
    })

}
//login checking
const handleLogin=()=>{
    const email= document.getElementById('logInEmail').value;
    const password= document.getElementById('logInPassword').value;
    console.log(email,password);
    validateUser(email,password);
}
const validateUser=async(email,pass)=>{
    const response = await fetch(`http://localhost:3000/allusers/${email}`);
    const data= await response.json();
    const info= {email}
    if(data.length>0 && data[0].user_pass==pass){
        fetch('http://localhost:3000/addcurrentuser', {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(info)
        })
        .then(res=>{
            console.log('response: ', res)
        });
        window.localStorage.setItem('user_info',JSON.stringify(data[0]));
        window.location.href = 'index.html';
        alert('Login Successful')
    }
    else{
        alert('Wrong email or Password');
    }

}
//Admin Login
const handleAdminLogIn=()=>{
    const email= document.getElementById('adminEmail').value
    const password= document.getElementById('password').value
    validateAdmin(email,password)
}
//Verify Admin
const validateAdmin=async(email,password)=>{
    const response= await fetch(`http://localhost:3000/admins/${email}`);
    const data= await response.json();
    console.log(data)
    if(data.length>0 && data[0].password==password){
       if(window.localStorage.getItem('user_info')){
        window.localStorage.removeItem('user_info')
       }
       window.localStorage.setItem('user_info',JSON.stringify(data[0]))
       alert('Login Successful')
       window.location.href='index.html';
    }
}



const handleLogOut=()=>{
    window.localStorage.removeItem('user_info');
    alert('Logout successfull')
    window.location.href='index.html';
}
//Adding New Phone
const handleAddNewPhone=()=>{
    const productModel= document.getElementById('productModel').value
    const productBrand= document.getElementById('productBrand').value
    const productImage= document.getElementById('productImage').value
    const network= document.getElementById('network').value
    const sim= document.getElementById('sim').value
    const displayType= document.getElementById('displayType').value
    const displaySize= document.getElementById('displaySize').value
    const displayResolution= document.getElementById('displayResolution').value
    const os= document.getElementById('os').value
    const chipset= document.getElementById('chipset').value
    const memory= document.getElementById('memory').value
    const rearCamera= document.getElementById('rearCamera').value
    const selfieCamera= document.getElementById('selfieCamera').value
    const battery= document.getElementById('battery').value
    const sensors= document.getElementById('sensors').value


    const phoneData={productModel,productBrand,productImage,network,sim,displayType,displaySize,displayResolution,os,chipset,memory,rearCamera,selfieCamera,battery,sensors}
    
    fetch('/addnewphone')
}