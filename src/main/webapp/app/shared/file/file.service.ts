import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private resourceUploadUrl = SERVER_API_URL + 'api/v1/files/upload';

  constructor(private http: HttpClient) {}

  uploadImageCommon(fileUpload: File | undefined): Observable<HttpResponse<String>> {
    if (fileUpload) {
      const file: FormData = new FormData();
      file.append('file', fileUpload, fileUpload.name);
      return this.http.post<String>(this.resourceUploadUrl, file, { observe: 'response' });
    } else {
      return EMPTY;
    }
  }
}
