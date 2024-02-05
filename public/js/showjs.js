
  let taxswitch=document.getElementById("flexSwitchCheckDefault");
 
  taxswitch.addEventListener("click",()=>{
    let tax=document.getElementsByClassName("tax-info");
for(info of tax)
{
  if(info.style.display != "inline")
  {
    info.style.display="inline";
  }
  else{
    info.style.display="none";
  }
}
    console.log(tax);
  });
