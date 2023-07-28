import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: any[] = [];
  @Output() selectedItems: EventEmitter<any[]> = new EventEmitter<any[]>();
  selectedRows: number = 0;
  selectedObjects: any[] = [];

  // Select all checkbox
  onSelectAll(event: Event) {
    const target = event.target as HTMLInputElement;
    this.data.forEach(row => {
      if (row.status === 'available') {
        (row.isSelected = target.checked)
      }
    });
    this.updateSelectedItems();
  }

  // Single checkbox selection
  onRowSelection(row: any, event: Event) {
    const target = event.target as HTMLInputElement;
    row.isSelected = target.checked;
    this.updateSelectedItems();
  }

  // If a row is click
  onRowClick(row: any) {
    if (row.status === 'available') {
      row.isSelected = !row.isSelected;
      this.updateSelectedItems();
    }
  }

  // This refereshes my values and emits to parent comp
  updateSelectedItems() {
    this.selectedRows = this.data.filter(item => item.isSelected).length;
    this.selectedObjects = this.data.filter(item => item.isSelected);
    this.selectedItems.emit(this.selectedObjects);
  }

  // This for now will just console log an array with all the objects of each row
  onDownload() {
    console.log('Download Object ', this.selectedObjects);
    this.showAlertWithSelectedItems();
  }

  // Alert format
  showAlertWithSelectedItems() {
    const selectedPathsAndDevices = this.selectedObjects.map(item => ({
      path: item.path,
      device: item.device
    }));

    const alertMessage = JSON.stringify(selectedPathsAndDevices, null, 2);
    alert(alertMessage);
  }
  
  // Boolean method for if select all is true
  isAllSelected(): boolean {
    return this.selectedRows === this.data.filter(item => item.status === 'available').length;
  }
}
