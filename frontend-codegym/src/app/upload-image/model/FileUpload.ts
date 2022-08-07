export class FileUpload {
  constructor(file: File) {
    this.file = file;
  }

  key: string;
  name: string;
  url: string;
  file: File;
}
