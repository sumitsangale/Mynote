console.log("welcome to mynote");
shownotes();

//If user added notes data saved to localstorage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function(e){
    let addtxt = document.getElementById('addtxt');
    if(addtxt.textLength==0){
        alert("Please write somthing in 'Add a note'")
    }
    else{
    let notes = localStorage.getItem('notes');
    if(notes==null){
        notesobj = [];
    }
    else{
        notesobj=JSON.parse(notes);
    }
    notesobj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value ='';
    shownotes();
}
})

//Function to show from localstorage
function shownotes(){
    let notes = localStorage.getItem('notes');
    if(notes==null){
        notesobj = [];
    }
    else{
        notesobj=JSON.parse(notes);
    }
    let html ="";
    notesobj.forEach(function(element,index){
        html +=`
        <div class="notecard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index+1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deletnote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
        `    
    });

    let noteEle = document.getElementById('notes');
    if(notesobj.length != 0){
        noteEle.innerHTML = html;
    }
    else{
        noteEle.innerHTML=`Nothing to show. use Add a Note' section`
    }
}

// Function to delete note
function deletnote(index) {
    let notes = localStorage.getItem('notes');
    if(notes==null){
        notesobj = [];
    }
    else{
        notesobj=JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();

}

// Search functionality
let search = document.getElementById('searchtxt');
search.addEventListener('input',function(){
    let inputval = search.value.toLowerCase();
    let notecard = document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(function(element){
        let cardtext = element.getElementsByTagName('p')[0].innerText;  
        if(cardtext.includes(inputval)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    })

})