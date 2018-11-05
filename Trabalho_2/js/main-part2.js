let url = "http://rest.learncode.academy/api/aquila/";
let xhttp = new XMLHttpRequest();
  function generateColor(){
    let hexadessimal = "0123456789ABCDEF"
    cor = "#";
    for(let i = 0; i < 6; i++){
      cor += hexadessimal[Math.floor(Math.random() * 16)];
    }
    return cor;
  }
  
  let groupList = document.querySelector(".group-list");
  let currentMessage = document.querySelector(".current-message");
  let groupName = document.querySelector(".group-name");
  let messages = document.querySelector(".message-body");
  
  
  function addItemList(item){
    let profile = document.createElement("div");
    let genericIcon = document.createElement("div");
    genericIcon.classList.add("generic-icon");
  
    let defaultPicture = document.createElement("img");
    defaultPicture.src = "./img/generic-icon.png";
    genericIcon.append(defaultPicture);
  
    profile.append(genericIcon)
    profile.classList.add("profile-picture");
  
    let li = document.createElement("li");
    li.classList.add("item-list");
    li.appendChild(profile);
    
    let groupInformation = document.createElement("div");
    groupInformation.classList.add("item-information");
    groupInformation.textContent = item.groupName;
    li.append(groupInformation);
    li.addEventListener("click", () =>{
      changeMessage(item.groupID);
    })
    groupList.append(li);
  }
  
  let jsonMessages = null;
  function changeMessage(itemID, groupName){
    xhttp.onreadystatechange = () =>{
        if(xhttp.readyState == 4){
            jsonMessages = JSON.parse(xhttp.responseText);
            let profile = document.createElement("div");
            let genericIcon = document.createElement("div");
            genericIcon.classList.add("generic-icon");
        
            let defaultPicture = document.createElement("img");
            defaultPicture.src = "./img/generic-icon.png";
            genericIcon.append(defaultPicture);
        
            profile.append(genericIcon)
            profile.classList.add("profile-picture");
        
            let groupInformation = document.createElement("div");
            groupInformation.classList.add("item-information");
            groupInformation.textContent = groupName;
        
            while (currentMessage.firstChild) {
            currentMessage.removeChild(currentMessage.firstChild);
            }
            while(messages.firstChild){
            messages.removeChild(messages.firstChild);
            }
        
            for(let i = 0; i < item.mensagens.length; i++){
            let div = document.createElement("div");
            let name  = document.createElement("div");
            let message = document.createElement("div");
            message.textContent = item.mensagens[i].texto;
            name.textContent = item.mensagens[i].usuario;
            name.style.color = generateColor();
            name.style.fontSize = "20px";
            div.append(name);
            div.append(message);
            div.classList.add("single-message");
            messages.append(div);
            }
            currentMessage.append(profile);
            currentMessage.append(groupInformation);
            groupName.textContent = item.grupo;
        }
        xhttp.open("GET", url + itemID, true);
        xhttp.send();
    }
    
  }
  let jsonGroups = null;
  
  function getMessages(){
    xhttp.onreadystatechange = ()=> {
        if(xhttp.readyState == 4){
            jsonGroups = JSON.parse(xhttp.responseText);
            for(let i = 0; i< jsonGroups.length; i++){
                addItemList(jsonGroups[i]);
            }
            if(jsonGroups.length > 0){
                changeMessage(jsonGroups[0].groupID, jsonGroups[0].groupName);
            }
        }
    };
    xhttp.open("GET", url + "groups", true);
    xhttp.send();
  }
  
  getMessages();