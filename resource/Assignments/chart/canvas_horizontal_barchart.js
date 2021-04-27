const canvas_horizontal_barchart = document.getElementById('canvas_horizontal_barchart');

let test2 = new Chart(canvas_horizontal_barchart, {
  type: 'horizontalBar',
  data: {
    labels: ["DISTRICT 01",	"DISTRICT 02",	"DISTRICT 03","DISTRICT 04","DISTRICT 05","DISTRICT 06","DISTRICT 07",	"DISTRICT 08","DISTRICT 09","DISTRICT 10"],
    datasets: [
      {
        label: "Percentages(%)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#DAA520","#B22222","#228B22","#4B0082","#20B2AA"],
        data: [91.18,89.01,89.28,91.13,89.08,91.34,86.75,87.15,89.27,88.92]
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: '2010-2011 School Attendance Percentages (Avg.) of First 10 Districts'
    },
    scales:{
      xAxes:[{
        ticks:{
          min:80,
          max:100
        }
      }]
    }
  }
});
