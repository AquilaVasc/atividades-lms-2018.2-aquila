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

let groupList = document.querySelector(".group-list");

getMessages(json);
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
  groupList.append(li);
}
function getMessages(arrayGroups){
  for(let i = 0; i< arrayGroups.length; i++){
    addItemList(arrayGroups[i]);
    console.log(arrayGroups[i])
  }
}