const canvas_grouped_barchart = document.getElementById('canvas_grouped_barchart');

let test = new Chart(canvas_grouped_barchart, {
  type: 'bar',
  data: {
    labels: ["01M292", "01M448", "01M450", "01M458", "01M509", "01M515","01M539",  "01M650", "01M696"],
    datasets: [
      {
        label: "SAT Critical Reading",
        backgroundColor: "#B22222",
        data: [355,383,377,414,390,332,522,417,624]
      }, {
        label: "SAT Math",
        backgroundColor: "#FF8C00",
        data: [404,423,402,402,433,557,574,418,604]
      }, {
        label: "SAT Writing",
        backgroundColor: "#228B22",
        data: [363,366,370,359,384,316,525,411,628]
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: '2012 SAT Results (Avg.) of First 10 highschools by DBNs'
    },
    scales:{
      yAxes:[{
        ticks:{
          min:200,
          max:800
        }
      }]
    }
  }
});

