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
        // fetch('http://localhost:3000/addcurrentuser', {
        // method: "POST",
        // headers: {'Content-Type': 'application/json'}, 
        // body: JSON.stringify(info)
        // })
        // .then(res=>{
        //     console.log('response: ', res)
        // });
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
    //    if(window.localStorage.getItem('user_info')){
    //     window.localStorage.removeItem('user_info')
    //    }
       window.localStorage.setItem('user_info',JSON.stringify(data[0]))
       window.location.href='index.html';
       alert('Login Successful')
    }else{
        alert('Wrong email or Password');
    }
}



const handleLogOut=()=>{
    // window.localStorage.removeItem('user_info');
    window.localStorage.clear();
    alert('Logout successfull')
    window.location.href='index.html';
}
//Adding New Phone
const handleAddNewPhone=()=>{
    const productModel= document.getElementById('productModel').value
    const productBrand= document.getElementById('productBrand').value
    const productImage= document.getElementById('productImage').value
    const productPrice= document.getElementById('productPrice').value
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
    const admindData= localStorage.getItem('user_info')
    const adminEmail= JSON.parse(admindData).email; 


    const phoneData={productModel,productBrand,productImage,productPrice,network,sim,displayType,displaySize,displayResolution,os,chipset,memory,rearCamera,selfieCamera,battery,sensors,adminEmail}
    
    fetch('http://localhost:3000/addnewphone', {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(phoneData)
    })
    .then(res=>{
        console.log('response: ', res)
        alert('Added Data Successfully')
        window.location.href ='index.html'

        if(res.status==200){
            // alert('Added Data Successfully')
            // window.location.href ='index.html'
            
            
        }
        else{
            console.log('something went wrong')
        }
    })
}

//Show all phones data in phones section of homepage
const showPhoneData=async()=>{
    const response=await fetch('http://localhost:3000/allphones')
    const data= await response.json()
    const phoneSection= document.getElementById('phoneSection');
    data.map(phone=>{
        const phoneCard= document.createElement('div');
        phoneCard.innerHTML=`
        <div class="border-2 spacey-3 p-3 rounded-xl cursor-pointer hover:scale-105  transition-transform duration-300 transform origin-center">
            <div class="w-full flex justify-center">
                <img class="w-72 h-56" src=${phone.productImage} alt="">
            </div>
            <h3 class="text-center text-lg font-bold mb-2">${phone.productModel}</h3>
            <p class="text-center font-semibold mb-2">${phone.productPrice}</p>
            <div class="flex gap-2 justify-center">
                <button class="btn bg-slate-500 text-white ">Compare</button>
                <a href="mobile.html?id=${phone.id}"><button class="btn bg-green-500 text-white ">Details</button></a>
            </div>
        </div>
        `
        phoneSection.appendChild(phoneCard);
    })
    
    
}
//Show single phone's details
const showPhoneDetails=async(id)=>{
    const response= await fetch(`http://localhost:3000/allphones/${id}`)
    const data= await response.json();
    document.getElementById('phoneDetails').innerHTML=`
    <img
        src=${data[0].productImage}
        alt="iphone 15 pro max"
      />
      <div class="details">
        <p><span class="titleFont">Brand: </span>${data[0].productBrand}</p>
        <p><span class="titleFont">Model: </span>${data[0].productModel}</p>
        <p><span class="titleFont">Network: </span>${data[0].network}</p>
        <p><span class="titleFont">SIM: </span>${data[0].sim}</p>
        <p><span class="titleFont">Display Type: </span>${data[0].displayType}</p>
        <p><span class="titleFont">Display Size: </span>${data[0].displaySize}</p>
        <p><span class="titleFont">Display Resolution: </span>${data[0].displayResolution}</p>
        <p><span class="titleFont">OS: </span>${data[0].os}</p>
        <p><span class="titleFont">Chipset: </span>${data[0].chipset}</p>
        <p><span class="titleFont">Memory: </span>${data[0].memory}</p>
        <p><span class="titleFont">Main Camera: </span>${data[0].rearCamera}</p>
        <p><span class="titleFont">Selfie Camera: </span>${data[0].selfieCamera}</p>
        <p><span class="titleFont">Battery Info: </span>${data[0].battery}</p>
        <p><span class="titleFont">Sensors: </span>${data[0].sensors}</p>

        <div>
            <button  onclick='handleBuyNow(${JSON.stringify(data[0])})'>Buy Now</button>
            <a href="index.html"><button  style="background-color: rgb(100 116 139)">Return Home</button></a>
            <button class="btn text-white" style="background-color: red;" id="deleteBtn"  onclick="my_modal_5.showModal()">Delete Product</button>
            <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Warning!</h3>
                    <p class="py-4">Press the Delete Button to confirm or esc to cancel</p>
                    <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button onclick="handleDeleteProduct(${data[0].id})"  class="btn text-white" style="background-color: red;">Delete</button>
                    </form>
                    </div>
                </div>
            </dialog>
        </div>
        
    </div>

    `

}
//delete  product code
const handleDeleteProduct=(id)=>{
    fetch(`http://localhost:3000/deleteproduct/${id}`, {
        method: "DELETE",
    })
    .then(res=>{
        console.log('response: ', res)
    })
    alert('Deleted successfully')
    setTimeout(()=>{
        window.location.href = 'index.html'
    },0)

}

//Show all watches data in watches section of homepage
const showWatchData=async()=>{
    const response=await fetch('http://localhost:3000/allwatches')
    const data= await response.json()
    const watchSection= document.getElementById('watchSection');
    data.map(watch=>{
        const watchCard= document.createElement('div');
        watchCard.innerHTML=`
        <div class="border-2 spacey-3 p-3 rounded-xl cursor-pointer hover:scale-105  transition-transform duration-300 transform origin-center">
            <div class="w-full flex justify-center">
                <img class="w-72 h-56" src=${watch.productImage} alt="">
            </div>
            <h3 class="text-center text-lg font-bold mb-2">${watch.productModel}</h3>
            <p class="text-center font-semibold mb-2">${watch.productPrice}</p>
            <div class="flex gap-2 justify-center">
                <button class="btn bg-slate-500 text-white ">Compare</button>
                <a href="watch.html?id=${watch.id}"><button class="btn bg-green-500 text-white ">Details</button></a>
            </div>
        </div>
        `
        watchSection.appendChild(watchCard);
    })
    
    
}
const handleBuyNow=(phoneData)=>{
    console.log(phoneData)
    const currentUser= localStorage.getItem('user_info')
    if(!currentUser){
        alert('You Must login first')
        window.location.url='signup.html'
    }
    else{
        var cartData= localStorage.getItem('carts')
        var cartArray=[]
        if(cartData){
            // window.localStorage.removeItem('carts');
            parsedCartData= JSON.parse(cartData);
            // cartArray.push(parsedCartData);
            // cartArray.push(phoneData)
            parsedCartData.push(phoneData);
            window.localStorage.setItem('carts', JSON.stringify(parsedCartData))
        }
        else{
            cartArray.push(phoneData)
            window.localStorage.setItem('carts', JSON.stringify(cartArray))
        }
        
        alert('Product Added To carts')
        setTimeout(()=>{
            window.location.href = 'index.html'
        },0)
    }

}

const showCartTable=()=>{
    const cartItems=localStorage.getItem('carts')
    if(!cartItems){
        alert('Your cart is empty!! First add something into cart')
        return setTimeout(()=>{
                    window.location.href = 'index.html'
                },0)
    }
    else{
        const parsedCartItems= JSON.parse(cartItems)
        const rows=document.getElementById('cartTableRow')
        parsedCartItems.map(item=>{
            const row=document.createElement('tr')
            row.innerHTML=`
                <tr class="hover">
                    <th>${item.id}</th>
                    <td>${item.productModel}</td>
                    <td>${item.productPrice}</td>
                    <td>pending</td>
                </tr>
            `
            rows.appendChild(row)

        })
    }
    
}

const handleConfirmOrder=()=>{
    const cartItems=localStorage.getItem('carts')
    const parsedCartItems= JSON.parse(cartItems)
    parsedCartItems.map(item=>{
        const productId=item?.id;
        const productBrand= item?.productBrand;
        const productModel= item?.productModel
        const productPrice= item?.productPrice;
        const userData= localStorage.getItem('user_info')
        const userEmail= JSON.parse(userData).email;
        const orderInfo= {productId,productBrand,productModel,productPrice,userEmail}
        // console.log(orderInfo)
        fetch('http://localhost:3000/allOrders', {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(orderInfo)
        })
        .then(res=>{
            console.log('response: ', res)
            if(res.status==200){
                localStorage.removeItem('carts')
                alert('Ordered successfully')
                setTimeout(()=>{
                    window.location.href = 'index.html'
                },0)
                
            }
        })
    })
}
const handleResetCart=()=>{
    const cartItems=localStorage.getItem('carts')
    if(cartItems){
        localStorage.removeItem('carts');
        alert('your cart is now Empty')
        window.location.href='cart.html';
    }
    else{
        alert('Nothing in your cart')
    }

}

const handleAddNewWatch=()=>{ 
    const productModel= document.getElementById('productModel').value
    const productBrand= document.getElementById('productBrand').value 
    const productImage= document.getElementById('productImage').value 
    const productPrice= document.getElementById('productPrice').value 
    const callingFeature= document.getElementById('callingFeature').value 
    const chargingTime= document.getElementById('chargingTime').value 
    const displayDetails= document.getElementById('displayDetails').value 
    const waterProof= document.getElementById('waterProof').value 
    const os= document.getElementById('os').value 
    const sensors= document.getElementById('sensors').value 
    const batteryLife= document.getElementById('batteryLife').value 
    const features= document.getElementById('features').value 
    const admindData= localStorage.getItem('user_info') 
    const adminEmail= JSON.parse(admindData).email;  
 
    const watchData={productModel,productBrand,productImage,productPrice,callingFeature,chargingTime,displayDetails,waterProof,batteryLife,os,features,sensors,adminEmail} 
     
    fetch('http://localhost:3000/addnewwatch', { 
        method: "POST", 
        headers: {'Content-Type': 'application/json'},  
        body: JSON.stringify(watchData) 
    }) 
    .then(res=>{ 
        console.log('response: ', res) 
        alert('Added Data Successfully') 
        window.location.href ='index.html' 
 
        if(res.status==200){ 
            alert('Added Data Successfully') 
            // window.location.href ='index.html' 
             
             
        } 
        else{ 
            console.log('something went wrong') 
        } 
    }) 
} 

//

