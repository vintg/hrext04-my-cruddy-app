$(document).ready(function() {

  // plate validation ************************
  var validPlate = function(serial, state){
      var re = /^(\d{6}|\d{7})$/; // any 6 or 7 default
      
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
        if(state ==='ID'){
          re = /^([E|K|N|S|V|W][A-Z\d]{6}|[1,2][A-C|F|G|J|M|O|P|T][A-Z\d]{5}$|[3,4][B|C|L][A-Z\d]{5}|[5-7][B|C][A-Z\d]{5}|[8,9]B[A-Z\d]{5}|10B[A-Z\d]{4})$/;
        }
      } else if (moexp.includes(state)) {
      // more magic happens
      } else if(one5.includes(state)) { // 1 L 5 N
        re = /^([A-Z]\d{5})$/;
      } else if (two4.includes(state)) { // 2 L 4 N
        re = /^([A-Z]{2}\d{4})$/;
      } else if (three3.includes(state)) { // 3 L 3 N
        re = /^([A-Z]{3}\d{3})$/;
      } else if (four2.includes(state)) { // 4 L 2 N
        re = /^([A-Z]{4}\d{2})$/;
      } else if (seven.includes(state)) { // 7 N
        re = /^([A-Z\d]{7})$/;
      } else if (two5.includes(state)) { // 2 L 5 N
        re = /^([A-Z]{2}\d{5})$/;
      } else if (three3.includes(state)){ // 3 L 4 N
        re = /^([A-Z]{3}\d{4})$/;
      }
      return !!serial.match(re);
  };

  // Register and Login **************************************
  
  // default

  var guestGen = function(){
    var n0 = 'Guest';
    for (var i =0; i<7;i++){
      var rndDigit = Math.floor(Math.random()*10);
      n0+= rndDigit.toString();
    }
    return n0;
  }

   var userID = guestGen();
   console.log('User ID = ' + userID);
   $(".identifier").html(userID);
   $(".identifier").val(userID);

  //login
   $(".login").on("click", function(){
    // to do

    //admin
    $(".avatar").css({'background-image': 'url(img/avent.png'});
    $(".achievements").css({'opacity': '1' });
    $(".user-rating").html( '<div class="starability-result" data-rating="5"></div>')
    $(".level").val(99);
    $(".level").html('<h2>Level 99</h2>');
    userID = 'Admin';
    $(".identifier").html(userID);
    $(".identifier").val(userID);
    $(".del-text-btn").css({'opacity':'1'});
    // end admin

   });

   $(".reg").on("click", function(){
    // to do
  });

  // submit entry *******************************************
  $(".add-text-btn").on("click", function(){
    // store values
    var inputKey = $(".user-input-title").val(); // plate
    var inputValue = { // cmt, stars, state
                    feedback: [$(".user-input-body").val()],
                    stars: [$("input[type='radio'][name='rating']:checked").val()],
                    state: $(".user-input-state").val(),
                    history: [userID],
                    timestamps: [new Date()]
                    };

    console.log(inputKey, inputValue, 'state = '+inputValue.state);

    var dateRange = function(prev, next){
      return ( Math.abs(prev.getMinutes() - next.getMinutes())<30 );
    }

    if(validPlate(inputKey, inputValue.state)){

      if( !!localStorage.getItem(inputKey.toString()) ){
        var temp=JSON.parse(localStorage.getItem(inputKey));
        var prev = new Date(temp.timestamps[temp.history.lastIndexOf(userID)]);
        var next = inputValue.timestamps[0];

        if( !dateRange(prev, next) ){
          console.log('appending...');
          
          let newVal = { // cmt, stars, state
            feedback: temp.feedback.concat(inputValue.feedback),
            stars: temp.stars.concat(inputValue.stars),
            state: inputValue.state,
            history: temp.history.concat(inputValue.history), 
            timestamps: temp.timestamps.concat(new Date())
            };
          
          localStorage.setItem(inputKey, JSON.stringify(newVal));
          var msg = JSON.stringify(inputValue);
        } else {
          var msg = 'You\'ve already provided feedback on this driver recently.';
        }

      } else { 
        localStorage.setItem(inputKey, JSON.stringify(inputValue));
      } //end if storing value

    } else {
    var msg = 'Invalid license plate ID';
    } // end plate validation

    // clear input box values
    $(".user-input-title").val("");
    $(".user-input-body").val("");
    $(".user-input-state").val(""); 
    // $("input[type='radio'][name='rating']:checked").val("");
    // star();

    // data-display
    var itemHtml = '<div class="display-item" data-storage-key="'+inputKey+'"> ' + inputKey + ' ' +  msg + '</div>';
    $(".display").html(itemHtml);
    setTimeout(function(){ $('.display').fadeOut("slow") }, 2000);
    console.log(msg);

    // how can we delegate this event to the outer html node?
    // https://learn.jquery.com/events/event-delegation/

  });

  var sum = function(array){
    return array.reduce(function(total,n){
      return total+parseInt(n);
    },0);
  };

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

// random data gen **************************************
var ncar = Math.floor(Math.random() * 10);
var models = [
  'Honda Civic', 'Honda Accord', 'Toyota Corolla', 'Toyota Camry', 'Nissan Sentra', 'Ford Fusion', 'Hyundai Elantra', 'Nissan Altima', 'Chevrolet Malibu', 'Chevrolet Cruze', 'Ford Mustang', 'Dodge Charger', 'Jeep Grand Cherokee', 'Ford Explorer', 'Jeep Cherokee', 'Jeep Wrangler', 'Honda CR-V', 'Mercedes-Benz E', 'Mercedes-Benz C', 'Tesla Model S', 'Tesla Model X', 'Tesla Model 3', 'Cadillac Escalade', 'Audi A8', 'Lexus RX', 'Subaru Forester', 'Toyota Prius', 'Audi A7', 'Audi A5', 'Toyota RAV4', 'BMW 5', 'BMW 3', 'Lexus ES', 'BMW X3', 'BMW X5', 'BMW 4', 'Audi A3', 'Audi Q3', 'Mazda 3', 'Mazda 6', 'Volkswagon Jetta', 'Acura TLX', 'Infiniti QX60', 'Kia Sorento', 'Dodge Caravan', 'Nissan GT-R', 'Audi R8', 'Porsche GT3 RS', 'Porsche Carrera GTS', 'Lamborghini Huracan', 'Acura NSX', 'Aston Martin Vantage', 'Ferrari 488 GTB', 'Maserati Quattroporte', 'Maserati Ghibli', 'Maserati GT', 'McLaren 720S', 'Koenigsegg CCR', 'Bugatti Chiron', 'Bugatti Veyron', 'Lamborghini Veneno'
            ];
  

//

});