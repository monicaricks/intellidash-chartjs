$(document).ready(function(){
  $.get('https://www.batchacademy.com/api/wdfne/dummy/intellidash', function(responseData){
    for(var i = 0; i < responseData; i++){
      var newTr = $('<tr/>').text(responseData.order);
      var newTd = $('<td/>').appendTo(newTr);
      
    }

  }
}