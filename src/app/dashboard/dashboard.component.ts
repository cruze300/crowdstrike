import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/services/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tableData: any[] = [];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.getDataFromService();
  }

  // This Method Calls on my Service File With A Get Request To Local Json
  getDataFromService() {
    this.mainService.getData().subscribe({
      next: (data) => {
        this.tableData = data;
        // console.log('Data received:', this.tableData);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  // This is an output from the created shared comp Table
  onSelectedItems(selectedObjects: any[]) {
    console.log('Selected Items:', selectedObjects);
  }

}
