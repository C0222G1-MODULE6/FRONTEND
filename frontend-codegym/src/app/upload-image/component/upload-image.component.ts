import { Component, OnInit } from '@angular/core';
import {FileUploadService} from '../service/file-upload.service';
import {FileUpload} from '../model/FileUpload';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  files: FileUpload[] = [];
  percentage: number;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.getAll();
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.fileUploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
        this.getAll();
      },
      error => {
        console.log(error);
      }
    );
  }

  getAll() {
    this.fileUploadService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()}
      )))).subscribe((urls: any) => {
      this.files = urls;
      for (const fileUpload of this.files) {
        console.log(fileUpload.url);
      }
    });
  }
}
