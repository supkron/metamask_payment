var d = document;

d.querySelector("#access_acount").addEventListener("click",async ()=>{
    if(typeof ethereum != undefined ){
        await ethereum.request({method:"eth_requestAccounts"});
        d.querySelector("#acc_about").innerHTML = "บัญชีของคุณ : "+ethereum.selectedAddress;
    }
});

ethereum.on("accountsChanged",(acc)=>{
    d.querySelector("#acc_about").innerHTML = "บัญชีของคุณ : "+ethereum.selectedAddress;
});

d.querySelector("#donate_btn").addEventListener("click",()=>{
    let price = d.querySelector("#donate_input").value;
    if(price==""){setAlert("โปรดกรอกจำนวนให้ถูกต้อง","danger");return;}
    ethereum.request({
        method:"eth_sendTransaction",
        params: [{
            from:ethereum.selectedAddress,
            to:"0xAd8619Ef0422464cdA1d85826613faCCE6a71d7b",
            value:convertToWei(Number(price))// 1eth = 10^18 wei
        }]
    })
    .then((txtHash)=>{
        setAlert("ดำเนินการเรียบร้อย! (txtHash :"+txtHash+" )","success");
    })
    .catch((err)=>{
        console.log(err);
        switch(err.code){
            case -32602:
                setAlert("โปรดเชื่อมต่อกับWallet!","danger");
                break;
            default :
                setAlert("เกิดข้อผิดพลาดไม่ทราบสาเหตุ!","danger");
                break;
        }
    })
});
ethereum.request({
    method: "eth_getBalance",
    params: [ethereum.selectedAddress, "latest"]
}).then(balance => {
    let etherBalance = web3.utils.fromWei(balance, "ether");
    console.log("Ether Balance: ", etherBalance);
    d.querySelector("#balance").innerHTML = etherBalance + " ETH";
});


function convertToWei(price){
    return "0x"+Number(price*1e+18).toString(16);
}

function setAlert(txt,alertColor){
    let alertBox = d.querySelector("#alert_box");
    alertBox.style = "display:block";
    alertBox.innerHTML = txt;
    alertBox.className = "alert alert-"+alertColor;
}
ethereum.request({
    method: "eth_getBalance",
    params: [ethereum.selectedAddress, "latest"]
}).then(balance => {
    // Convert the balance from Wei to Ether
    let etherBalance = web3.utils.fromWei(balance, "ether");
    // Display the balance on the page
    let balanceElement = document.querySelector("#balance");
    balanceElement.innerHTML = etherBalance + " ETH";
});
// JavaScript code to retrieve the user's balance and update the HTML element
// JavaScript code to retrieve the user's balance and update the HTML element
ethereum.request({
    method: "eth_getBalance",
    params: [ethereum.selectedAddress, "latest"]
}).then(balance => {
    // Convert the balance from Wei to Ether
    let etherBalance = web3.utils.fromWei(balance, "ether");
    // Select the HTML element where you want to display the balance
    let balanceElement = document.querySelector("#balance");
    // Update the innerHTML of the element with the balance
    balanceElement.innerHTML = etherBalance + " ETH";
});

