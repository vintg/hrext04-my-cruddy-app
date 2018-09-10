$(document).ready(function() {

  var ValidPlate = function(state){
  
  var re = ^(\d{6}|\d{7})$; // any 6 or 7
  /*by county

  
  Hawaii: K Kaua'i, M/L Maui, other Honolulu
  Idaho: 1A Ada, 2T Twin Falls, V Valley
  Guam 
  */
  
  var county = ['ID', 'MT', 'WY', 'SD', 'NE', 'MS', 'AL', 'HI'];
  var one5 = ['NV'];
  var two4 = ['TN','DC','ME'];
  var three3 = ['OR','AK','UT','CO','NM','OK','KS','AR','LA','KY','ND','MN','IA','SC','VT','PR'];
  var four2 = ['FL','NJ'];
  var seven = ['NH'];
  var two5 = ['IL', 'MD', 'CT'];
  var three4 = ['WA', 'CA', 'AZ', 'TX', 'WI', 'MI', 'OH', 'PA','NY','VA','NC','GA'];
  var random = ['IN', 'DE', 'RI']; 
  var moexp = ['MO','WV','MA'];



  if(county.includes(state)){
    // magic happens
  
  // 6 digits

  } else if(one5.includes(state)){ // 1 L 5 N
    re = ^[a-zA-Z]\d{5};
  } else if () { // 2 L 4 N
  

  }
  // 3 L 3 N
  // 4 L 2 N

  

  /*7 digits

  //7 numbers

  // 2 letters, 5 #
  
  // 3 letters, 4 #
  
  */

  };


  $(".add-text-btn").on("click", function(){

    // store values
    let inputKey = $(".user-input-title").val();
    let inputValue = [ 
                    $(".user-input-body").val(),
                    $(".user-input-state").val() 
                    ];

    // clear input box values
    $(".user-input-title").val("");
    $(".user-input-body").val("");
    $(".user-input-state").val(""); 

    console.log(inputKey, inputValue);

    if(ValidPlate(inputValue[1])){
      localStorage.setItem(inputKey, inputValue);
    } else {
      console.log('Invalid license plate ID');
    }

    // data-display
    //let itemHtml = '<div class="display-item" data-storage-key="'+inputKey+'"> ' + inputKey + ' ' +  localStorage.getItem(inputKey) + '</div>';
    //$(".display").html(itemHtml);

    console.log(localStorage);

    // how can we delegate this event to the outer html node?
    // https://learn.jquery.com/events/event-delegation/

    $(".display-item").on("click", function(e){
      // plop the key:value back into the input boxes

      // get the values from the the divs?
      console.log("key=> ", e.target.dataset.storageKey); // user-input-title
      localStorage.getItem(e.target.dataset.storageKey); // user-input-body

      // set those values in the form fields
      $(".user-input-title").val(e.target.dataset.storageKey);
      $(".user-input-body").val(localStorage.getItem(e.target.dataset.storageKey));
    });

  });



   // TODO add back in later
   // $(".user-input").on("keyup", function(){
   //   let inputValue = $(".user-input").val();
   //   localStorage.setItem("testStorage", inputValue);
   //   $(".display").text(localStorage.getItem("testStorage"));
   // });

   $(".del-text-btn").on("click", function() {
     //alert('item deleted? check the console'); // maybe change to a window.confirm
     localStorage.removeItem( $('.user-input-title').val() ); // grab the title and plop here
     $(".user-input-title").val("");
     $(".user-input-body").val("");
     // clearing display? what if I have multiple items?
     // after item is removed from local storage, redisplay items from local storage
     // refresh from storage?
   });


   // iterative approach to adding items
   // store data as stringified array of objects
   // store data with individual keys
  // how do we get keys? research Object.keys



});