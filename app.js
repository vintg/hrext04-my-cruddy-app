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

        if( !dateRange(prev, next) && userID!='Admin'){
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

// random data gen **************************************
var localCars = [];

var carModels = [
  'Honda Civic', 'Honda Accord', 'Toyota Corolla', 'Toyota Camry', 'Nissan Sentra', 'Ford Fusion', 'Hyundai Elantra', 'Nissan Altima', 'Chevrolet Malibu', 'Chevrolet Cruze', 'Ford Mustang', 'Dodge Charger', 'Jeep Grand Cherokee', 'Ford Explorer', 'Jeep Cherokee', 'Jeep Wrangler', 'Honda CR-V',  'Cadillac Escalade',  'Subaru Forester', 'Toyota Prius', 'Toyota RAV4',  'Mazda 3', 'Mazda 6', 'Volkswagon Jetta', 'Acura TLX', 'Kia Sorento', 'Dodge Caravan', 'Infiniti QX60', 'Tesla Model 3', 'Mercedes-Benz E', 'Mercedes-Benz C'
            ];

var fourStarCars = [
  'BMW 5', 'BMW 3', 'Lexus ES', 'BMW X3', 'BMW X5', 'BMW 4', 'Audi A3', 'Audi Q3', 'Audi A7', 'Audi A5', 'Audi A8', 'Lexus RX', 'Acura NSX', 'Maserati Quattroporte', 'Maserati Ghibli', 'Maserati GT', 'Tesla Model S', 'Tesla Model X'
];

var fiveStarCars = [
  'Nissan GT-R', 'Audi R8', 'Porsche GT3 RS', 'Porsche Carrera GTS', 'Lamborghini Huracan', 'Aston Martin Vantage', 'Ferrari 488 GTB', 'McLaren 720S', 'Koenigsegg CCR', 'Bugatti Chiron', 'Bugatti Veyron', 'Lamborghini Veneno'
];
  
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

var randUser = function(aCar){
    var dUser = {
      feedback :[],
      stars: [],
      state:'NJ',
      history:[],
      timestamps: []
    };

    var ct = Math.floor(Math.random()*10)+2;
    for(var i =0; i< ct; i++){
      dUser.feedback.push('system');
      dUser.history.push('system');
      dUser.timestamps.push(new Date('July 4, 2018 00:00:00'));

      if(i>Math.floor(ct/2)){
        dUser.stars.push(aCar.rating - Math.floor(Math.random()*1));
      } else {
        dUser.stars.push(aCar.rating + Math.floor(Math.random()*1));
      }
    }

    var sum = function(array){
      return array.reduce(function(total,n){
        return total+parseInt(n);
      },0);
    };

    var avg = function(array){
      var n = array.length;
      if(!parseInt(n)){n=1;}
      return sum(array)/n;
    };

    aCar.rating = avg(dUser.stars);
    

    var rndPlate = function(l,n){
      var plate = '';
      for (var i = 0; i<l;i++){
        plate+= (String.fromCharCode(Math.floor(Math.random() * 26) + 97)).toUpperCase();
      }
      for (var j = 0; j<n;j++){
        plate+= Math.floor(Math.random()*10);
      }
        return plate;
    };

    aCar.id = rndPlate(4,2);

    localStorage.setItem(aCar.id, JSON.stringify(dUser));
    return aCar;
};

var genRandDriver = function(){
  var car = {};
  car.rank = Math.floor(Math.random()*42);
  car.id = guestGen();
  car.model = randomElement(carModels);
  car.distance = Number(Math.round(Math.random()*2+'e2')+'e-2').toFixed(2);
  car.rating = 1+Math.floor(Math.random()*3);

  var luckyStar = Math.random();
  if (luckyStar<.87 && luckyStar>.77){
    car.model = randomElement(fourStarCars);
    car.rank+=10;
    car.rating = 4;
  } else if (luckyStar >.99 ){
    car.model = randomElement(fiveStarCars);
    car.rank+=30;
    car.rating = 5;
  }

  if(car.rating!==3){
    car = randUser(car);
  }

  localCars.push(car);
  addCar(car);
};

var addCar = function(newCar){
  var divi = '"neutral"';

  if(newCar.rating<2){
    divi = '"bad"';
  } else if(newCar.rating===4){
    divi = '"good"';
  }
  //  elseif(newCar.rating===2){
  //   divi = '"warning"';
  // }
  if(newCar.distance <=2){
    var htmlstuff = '<tr class = '+ divi + ' value = "'+ newCar.id+'">' 
                      +'<td class ="dRank" value ="'+newCar.rank+'">'+ newCar.rank +'</td>'
                      +'<td class ="dId" value ="'+newCar.id+'">'+ newCar.id +'</td>'
                      +'<td class ="dModel" value ="'+newCar.model+'">'+ newCar.model +'</td>'
                      +'<td class ="dDistance" value ="'+newCar.distance+'">'+ newCar.distance +' mi' +'</td>'
                      +'<td class ="dRating" value ="'+newCar.rating+'">'+ '<div class="starability-result" data-rating="' + newCar.rating +'"></div>' +'</td>'
                  +'</tr>';
    $("#driverTable").append(htmlstuff);
  }
}

var initialize = function(n, b){
  var ncar = Math.floor(Math.random() * n+b);
  for (var i =0;i<ncar;i++){
    genRandDriver();
  }
};

// table sorts
$(".hLevel").on("click", function(){
  localCars.sort((a, b) => { return b.rank - a.rank; });
  refresh();
});

$(".hID").on("click", function(){
  localCars.sort((a, b) => { return Number(a.id.slice(5)) - Number(b.id.slice(5)); });
  refresh();
});

$(".hModel").on("click", function(){
  localCars.sort((a, b) => { 
    var makeA = a.model.split(' ');
    var makeB = b.model.split(' ');

    var len = Math.max(makeA.length, makeB.length);
    var idx=0;
    for(var i=0; i<len-1;i++){
      if(makeA[i] === makeB[i]){
        idx++;
      } else {
        break;
      }
    }
    return (makeA[idx]>makeB[idx]) ? 1:-1;
    });
  refresh();
});

$(".hDist").on("click", function(){
  localCars.sort((a, b) => { return Number(a.distance) - Number(b.distance); });
  refresh();
});
$(".hRating").on("click", function(){
  localCars.sort((a, b) => { return parseInt(b.rating) - parseInt(a.rating); });
  refresh();
});

var refresh = function(){
  console.log('refreshing...');
  $( "#driverTable" ).empty();
  for(var i =0; i<localCars.length;i++){
    addCar(localCars[i]);
  }
}

var rndUpdate = function(){
  var nupdates = Math.floor(Math.random()*localCars.length * .3);
  for (var i =0;i<nupdates;i++){
    var updCar = randomElement(localCars);
    if(updCar.id.length <8){
        if (Math.random() < .5){
          //console.log(updCar.id+ ' random upvote');
          updater(updCar, -1);
        } else{
         // console.log(updCar.id+ ' random downvote');
          updater(updCar, 1);
        }
    }
  } //end for random vote

  for(var j = 0;j<localCars.length;j++){
    var updCar = localCars[j];
    var change = Number(Math.round(Math.random()*.07+'e2')+'e-2').toFixed(2);
    var dir = -1; 
    if (Math.random() >.5 && updCar.distance > .02){
      dir = +1;
    }
    updCar.distance = Math.max(0, updCar.distance - change *dir).toFixed(2);
  }// end for all car dist
  
  var n = 1;
  if(localCars.length<=10){
    n+=Math.round(Math.random(3));
  }
  initialize(Math.floor(Math.random()*(5*n)));
  refresh();
};

var updater = function(dCar, vote){
  let inputKey = dCar.id.toString();
  var rate = 4+Math.round(Math.random()*1);
    
  if (vote<0){
    rate = Math.round(Math.random()*2);
    //flash row based on vote
    $("#driverTable").find()
  }

  let inputValue = {
      feedback: ['rndUpdate'],
      stars: [rate],
      state: dCar.state,
      history: ['rndUpdate'],
  };

  var temp=JSON.parse(localStorage.getItem(inputKey));

  let newVal = { // cmt, stars, state
    feedback: temp.feedback.concat(inputValue.feedback),
    stars: temp.stars.concat(inputValue.stars),
    state: inputValue.state,
    history: temp.history.concat(inputValue.history), 
    timestamps: temp.timestamps.concat(new Date())
    };
  
  localStorage.setItem(inputKey, JSON.stringify(newVal));
};

//start
var refreshRate=133.7; // in millisecs
var n = 33; // initial car val rand
var b = 9; // initial car base val
localStorage.clear();
initialize(n,b);
rndUpdate();
setInterval(refresh(), refreshRate);
setInterval(rndUpdate, Math.random() * 2000);
//

});