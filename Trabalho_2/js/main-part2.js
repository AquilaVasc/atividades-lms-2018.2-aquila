let url = "http://rest.learncode.academy/api/aquila/";
let xhttp = new XMLHttpRequest();
let xhttpMessages = new XMLHttpRequest();
let xhttpPostGroup = new XMLHttpRequest();
let xhttpPostMessages = new XMLHttpRequest();
let currentGroup = null
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
  
  
  function addItemList(gName, gID){
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
    groupInformation.textContent = gName;
    li.append(groupInformation);
    li.addEventListener("click", () =>{
      changeMessage(gID, gName);
    })
    groupList.append(li);
  }
  
  let jsonMessages = null;
  function changeMessage(itemID, gName){
    xhttpMessages.onreadystatechange = () =>{
        if(xhttpMessages.readyState == 4){
          currentGroup = itemID;
            jsonMessages = JSON.parse(xhttpMessages.responseText);
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
            groupInformation.textContent = gName;
        
            while (currentMessage.firstChild) {
              currentMessage.removeChild(currentMessage.firstChild);
            }
            while(messages.firstChild){
              messages.removeChild(messages.firstChild);
            }
        
            for(let i = 0; i < jsonMessages.length; i++){
              let div = document.createElement("div");
              let name  = document.createElement("div");
              let message = document.createElement("div");
              message.textContent = jsonMessages[i].message;
              name.textContent = jsonMessages[i].userName;
              name.style.color = generateColor();
              name.style.fontSize = "20px";
              div.append(name);
              div.append(message);
              div.classList.add("single-message");
              messages.append(div);
            }
            currentMessage.append(profile);
            currentMessage.append(groupInformation);
            groupName.textContent = gName;
        }
    }
    xhttpMessages.open("GET", url + itemID, true);
    xhttpMessages.send();
  }
  let jsonGroups = null;
  
  function getMessages(){
    xhttp.onreadystatechange = ()=> {
      if(xhttp.readyState == 4){
        jsonGroups = JSON.parse(xhttp.responseText);
        for(let i = 0; i< jsonGroups.length; i++){
            addItemList(jsonGroups[i].groupName, jsonGroups[i].groupID);
        }
        if(jsonGroups.length > 0){
          changeMessage(jsonGroups[0].groupID, jsonGroups[0].groupName);
        }
      }
    };
    xhttp.open("GET", url + "groups", true);
    xhttp.send();
  }

  function addGroup(groupName, groupID){
    console.log("enter")
    xhttpPostGroup.onreadystatechange = () =>{
      if(xhttpPostGroup.readyState == 4){
        addItemList(groupName, groupID);
        changeMessage(groupID, groupName);
      }
    }
    xhttpPostGroup.open("POST", url + "groups", true);
    xhttpPostGroup.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhttpPostGroup.send("groupName=" + groupName + "&groupID=" + groupID);
  }
  
  function addMessage(userName, messageText){
    console.log("enter")
    xhttpPostMessages.onreadystatechange = () =>{
      if(xhttpPostMessages.readyState == 4){
        if(currentGroup){
          let div = document.createElement("div");
          let name  = document.createElement("div");
          let message = document.createElement("div");
          message.textContent = messageText;
          name.textContent = userName;
          name.style.color = generateColor();
          name.style.fontSize = "20px";
          div.append(name);
          div.append(message);
          div.classList.add("single-message");
          messages.append(div);
        }
      }
    }
    xhttpPostMessages.open("POST", url + currentGroup, true);
    xhttpPostMessages.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhttpPostMessages.send("userName=" + userName + "&message=" + messageText);
  }

  let addG = document.querySelector(".add-group");
  addG.addEventListener("click", () =>{
    addGroup("name", "nameID");
  })

  let formIputsSubmit = document.querySelector(".inputs button");
  formIputsSubmit.addEventListener("click", () => {
    let formInput = document.querySelector(".message-input");
    addMessage("aquila", formInput.value);
  })

  
  getMessages();