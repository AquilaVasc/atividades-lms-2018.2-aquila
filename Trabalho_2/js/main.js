let url = "";
let json = [
  { 
    grupo: "Grupo da família!",
    mensagens: [
      {
      usuario: "joao03",
      texto: "Tudo bem?"
      },
      {
      usuario: "victor23",
      texto: "Tudo Tranqs"
      },
      {
      usuario: "joao03",
      texto: "Que bom"
      },
    ]
  },
  { 
    grupo: "Churrascão no domingão",
    mensagens: [
      {
      usuario: "maria2000",
      texto: "Na paz?"
      },
      {
      usuario: "victor23",
      texto: "Show"
      },
      {
      usuario: "maria2000",
      texto: "Que bom"
      }
    ]
  },
  { 
    grupo: "Só topzera",
    mensagens: [
      {
      usuario: "victor03",
      texto: "Bom?"
      },
      {
      usuario: "robson_alves",
      texto: "Bom"
      },
      {
      usuario: "victor03",
      texto: "Que bom"
      }
    ]
  }
];

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
  groupInformation.textContent = item.grupo;
  li.append(groupInformation);
  li.addEventListener("click", () =>{
    changeMessage(item);
  })
  groupList.append(li);
}

function changeMessage(item){
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
  groupInformation.textContent = item.grupo;

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


function getMessages(arrayGroups){
  for(let i = 0; i< arrayGroups.length; i++){
    addItemList(arrayGroups[i]);
  }

  if(arrayGroups.length > 0){
    changeMessage(arrayGroups[0]);
  }
}

getMessages(json);

//let groupItem = document.querySelectorAll(".item-list");
/*groupItem.addEventListner("click", () => {
  changeMessage(groupItem)
})*/