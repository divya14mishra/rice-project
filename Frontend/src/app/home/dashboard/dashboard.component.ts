import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  label = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  data = [12, 10, 7, 5, 2, 3];

  constructor() { }
  
  ngOnInit(): void {
    this.uploadLineChart(this.label, this.data);
    this.barChart(this.label, this.data);
    this.downloadLineChart(this.label, this.data);
    this.pieChart();
  }

  uploadLineChart(label, data) {
    var line_Chart = new Chart("lineChart", {
      type: 'line',
      data: {
        labels: label,
        datasets: [{
          label: 'Files uploaded last week',
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              // max: 15,
              // stepSize: 2,
              // precision: 0
              beginAtZero: true
            }
          }]
        },
        // responsive: true,
        // maintainAspectRatio: false
      }
    });
  }

  downloadLineChart(label, data) {
    var d_line_Chart = new Chart("lineChart1", {
      type: 'line',
      data: {
        labels: label,
        datasets: [{
          label: 'Files downloaded last week',
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              // max: 15,
              // stepSize: 2,
              // precision: 0
              beginAtZero: true
            }
          }]
        },
        // responsive: true,
        // maintainAspectRatio: false
      }
    });
  }

  pieChart() {
    var pie_Chart = new Chart("pieChart", {
      type: 'pie',
      data: {
        labels: ['Analyzed', 'Not analyzed'],
        datasets: [{
          label: 'Files downloaded last week',
          data: [20, 80],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(255, 159, 64, 1)', 'rgba(54, 162, 235, 0.2)'],
          borderWidth: 1
        }]
      } });
  }

  barChart(label, data) {
    var bar_Chart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: label,
        datasets: [{
          label: 'Image Analysed last week',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}

