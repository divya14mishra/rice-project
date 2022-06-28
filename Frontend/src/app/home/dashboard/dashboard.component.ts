import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    var myChart = new Chart("myChart1", {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 10, 7, 5, 2, 3],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              max: 15,
              stepSize: 2,
              precision: 0
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

}

