$(document).ready(function(){
  var generateChart = {
    gender: function(data){

      var chartData = [
        {
          value: 0 /* How do we get this value? */,
          color: "rgb(0,127,255)",
          highlight: "rgba(0,127,255,0.5)",
          label: "Male"
        },
        {
          value: 0 /* How do we get this value? */,
          color: "rgb(255,67,101)",
          highlight: "rgba(255,67,101,0.5)",
          label: "Female"
        }
      ];

      var maleObj = chartData[0];
      var femaleObj = chartData[1];

      for(var i = 0; i < data.length; i++){
        var order = data[i];
        if(order.person.gender === 'F'){
          femaleObj.value++;
        } else {
          maleObj.value++
        }
      }
      var ctx = $('.gender canvas').get(0).getContext("2d");
      var genderPieChart = new Chart(ctx).Pie(chartData);
    },
    orderTotal: function(data){
      var ranges = {
        '0-14': 0,
        '15-49': 0,
        '50-99': 0,
        '100-199': 0,
        '200-299': 0
      };

      for(var i = 0; i < data.length; i++){
        var purchase = data[i];
        if(purchase.order.total <= 14) {
          ranges['0-14']++;
        }else if(purchase.order.total <= 49 && purchase.order.total >= 15){
          ranges['15-49']++;
        }else if(purchase.order.total <= 99 && purchase.order.total >= 50){
          ranges['50-99']++;
        }else if(purchase.order.total <= 199 && purchase.order.total >= 100){
          ranges['100-199']++;
        }else if(purchase.order.total <= 299 && purchase.order.total >= 200){
          ranges['200-299']++;
        }
      }

      var chartData = {
        labels: ['0-14','15-49','50-99','100-199','200-299'] /* What should these labels be? */ ,
        datasets: [
          {
            fillColor: "rgba(0,127,255,0.4)",
            strokeColor: "rgba(0,127,255,0.8)",
            highlightFill: "rgba(0,127,255,0.8)",
            highlightStroke: "rgba(0,127,255,0.4)",
            data: [ranges['0-14'], ranges['15-49'], ranges['50-99'], ranges['100-199'], ranges['200-299']] /* How do we organize this data ? */
          }
        ]
      };

      
      var ctx = $('.order-total canvas').get(0).getContext("2d");
      var orderTotalBarChart = new Chart(ctx).Bar(chartData);
    },
    orderCategory: function(data){

      var categories = {
        belt: {
          value: 0,
          color: 'rgb(0,127,255)',
          highlight: 'rgba(0,127,255,0.5)',
          label: 'Belt'
        },
        shirt: {
          value: 0,
          color: 'rgb(177,143,207)',
          highlight: 'rgba(177,143,207,0.5)',
          label: 'Shirt'
        },
        pant: {
          value: 0,
          color: 'rgb(255,210,63)',
          highlight: 'rgba(255,210,63,0.5)',
          label: 'Pant'
        },
        footwear: {
          value: 0,
          color: 'rgb(255,67,101)',
          highlight: 'rgba(255,67,101,0.5)',
          label: 'Footwear'
        },
        jewelry: {
          value: 0,
          color: 'rgb(221,96,49)',
          highlight: 'rgba(221,96,49,0.5)',
          label: 'Jewelry'
        },
        jacket: {
          value: 0,
          color: 'rgb(44,246,179)',
          highlight: 'rgba(44,246,179,0.5)',
          label: 'Jacket'
        }
      };

      for(var i = 0; i < data.length; i++){
        var purchase = data[i];
        if(purchase.order.category === 'belt'){
          categories['belt'].value++;
        }else if(purchase.order.category === 'shirt'){
          categories['shirt'].value++;
        }else if(purchase.order.category === 'pant'){
          categories['pant'].value++;
        }else if(purchase.order.category === 'footwear'){
          categories['footwear'].value++;
        }else if(purchase.order.category === 'jewelry'){
          categories['jewelry'].value++;
        }else if(purchase.order.category === 'jacket'){
          categories['jacket'].value++;
        }
      }
      var ctx = $('.order-category canvas').get(0).getContext("2d");
      var orderCategoryPieChart = new Chart(ctx).Pie(categories);
    },
    orderTimeline: function(data){
      var quarters = [ 0,0,0,0];

      for(var i = 0; i < data.length; i++){
        var purchase = data[i];
        var month = Number(purchase.order.date.split('/')[0]);
        if(month <= 3){
          quarters[0]++;
        }else if(month <= 6){
          quarters[1]++;
        }else if(month <= 9){
          quarters[2]++;
        }else{
          quarters[3]++;
        }
      }
      console.log(quarters[0]);
      console.log(quarters[1]);
      console.log(quarters[2]);
      console.log(quarters[3]);

      var chartData = {
        labels: ['Q1','Q2', 'Q3','Q4'] /* What should these labels be? */ ,
        datasets: [
          {
            fillColor: "rgba(0,127,255,0.2)",
            strokeColor: "rgba(0,127,255,1)",
            pointColor: "rgba(0,127,255,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(0,127,255,1)",
            data: [quarters[0], quarters[1], quarters[2], quarters[3]] /* How do we organize this data? */
          }
        ]
      };
      var ctx = $('.order-timeline canvas').get(0).getContext("2d");
      var orderTimelineLineChart = new Chart(ctx).Line(chartData);
    }
  };

  $.get('https://www.batchacademy.com/api/wdfne/dummy/intellidash', function(responseData){
    //
    console.log(responseData);
    //GENDER CHART
    generateChart.gender(responseData);
    //ORDER TIMELINE
    generateChart.orderTimeline(responseData);
    //ORDER CATEGORY
    generateChart.orderCategory(responseData);
    //ORDER TOTAL
    generateChart.orderTotal(responseData);
  });

});
