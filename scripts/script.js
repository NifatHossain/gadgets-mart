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
        })
        window.location.href = 'index.html';
        
    }
    else{
        alert('Wrong email or Password');
    }

}