
// ** Variables
const firebaseURL = "https://jqueryajax-demo-default-rtdb.firebaseio.com/";
const jsonEXT = ".json";

//** Services */
function newCard(petData){
  let card = `
  <div class="petCard">
    <h3 class="petName">${petData.firstName}</h3>

    <span class="detail">
      <p>Name: </p>
      <input type="text" class="text-right petName" value="${petData.firstName}" readonly>
    </span>
    <span class="detail">
      <p>Nickname: </p>
      <input type="text" class="text-right petAka" value="${petData.nickName}" readonly>
    </span>
    <span class="detail">
      <p>Species: </p>
      <input type="text" class="text-right petSpecies" value="${petData.species}" readonly>
    </span>
    <span class="detail">
      <p>Breed: </p>
      <input type="text" class="text-right petBreed" value="${petData.breed}" readonly>
    </span>
    <span class="detail">
      <p>Age: </p>
      <input type="text" class="text-right petAge" value="${petData.age}" readonly>
    </span>

    <div class="actionBtns">
      <button class="deleteBtn" onclick="deletePet()" type="button">Delete</button>
      <button class="editBtn" onclick="editPet()" type="button">Edit</button>
    </div>

  </div>`

  // define where to append the cards
  $("#petList").append(card);
}

//** CRUD Operations */
// Create - PUT
function addPet(){
  const $name = $("#new-pet-name").val();
  const $aka = $("#new-pet-nickName").val();
  const $species = $("#new-pet-species").val();
  const $breed = $("#new-pet-breed").val();
  const $age = $("#new-pet-age").val();

  if(!$name || !$aka || !$species || !$breed || !$age ) {
    alert('Incomplete Registration')
  } else {
    let newPetObj = {
      firstName: $name,
      nickName: $aka,
      species: $species,
      breed: $breed,
      age: $age
    }

    $.ajax({
      type: "PUT",
      url:`${firebaseURL}${$name}${jsonEXT}`,
      data: JSON.stringify({...newPetObj}),
      success: (pet) => {
        newCard(pet);
      },
      error: (error)=> {
        console.log("PUT error", error)
      }
    })

    // Reset values
    $("#new-pet-name").val("");
    $("#new-pet-nickName").val("");
    $("#new-pet-species").val("");
    $("#new-pet-breed").val("");
    $("#new-pet-age").val("");
  }
}

// Read - GET function/event
  function getPets() {
  $.ajax({
    type: "GET",
    url: `${firebaseURL}${jsonEXT}`,
    success: (data) => {
      // console.log("Retrieving Data: ", data)
      // remove current list
      $("#petList").empty();
      Object.keys(data).forEach((pet)=>{
        // console.log("Pet", data[pet]);
        newCard(data[pet]);
      })
    },
    error: (error) => {
      console.log("Error getting data", error)
    }
  })
}
