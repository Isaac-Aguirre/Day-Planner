
$(document).ready(function(){
    //define the current date
    let currentTime = new Date();

    //make the current date and time display in the currentDay p tag
    document.getElementById("currentDay").innerHTML = currentTime.toLocaleString();

    //define currentHour to use later for color change 
    let currentHour = currentTime.getHours();

    //accessing local storage to get the item inputted. JSON parse used to unstring what was previously stringed
    let savedText = JSON.parse(localStorage.getItem('data')) || {}

    //when saveBtn is clicked invoke function that will:
    $(document).on("click", ".saveBtn", function(){

        //get the id of save and then change the string 'save' to 'text' (a little finesse so that we can access textid)
        let textid = $(this).attr('id').replace('save', 'text')

        //define the value of textid
        let text = $(`#${textid}`).val().trim()
        console.log(text)
        savedText[textid] = text;

        //set data of text area to local storage
        localStorage.setItem('data', JSON.stringify(savedText))
    });

//made a for loop to go through each hour times (military time)
    for (let i=9; i < 18; i++) {
    
        //used if/else statements to change colors of each text area depends on whether it is past present, future
        let textAreaColor = "red";

        if (i < currentHour) {
            textAreaColor = "gray";
        } else if (i === currentHour) {
            textAreaColor = "red";
        } else {
            textAreaColor= "green";
        }

    //Used template literal to append bootstrap elements to HTML (the text area, the save button, the time stamp)

    $(".time-block").append(`<div class='row'><div class='input-group'><div class ='input-group-prepend'>
    <span class= 'input-group-text hour hour${i}'>${i}:00</span></div>
    <textarea class='form-control col-sm-10' style="background: ${textAreaColor}" id="text${i}" aria-label='With textarea'>${savedText[`text${i}`] || ''}
    </textarea><button type='button' id='save${i}' class='btn btn-primary col-sm-1 saveBtn'>Save</button>
    </div></div>`)

    };


});


