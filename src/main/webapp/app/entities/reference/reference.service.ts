import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReference } from 'app/shared/model/reference.model';

type EntityResponseType = HttpResponse<IReference>;
type EntityArrayResponseType = HttpResponse<IReference[]>;

@Injectable({ providedIn: 'root' })
export class ReferenceService {
  public resourceUrl = SERVER_API_URL + 'api/references';

  constructor(protected http: HttpClient) {}

  create(reference: IReference): Observable<EntityResponseType> {
    return this.http.post<IReference>(this.resourceUrl, reference, { observe: 'response' });
  }

  update(reference: IReference): Observable<EntityResponseType> {
    return this.http.put<IReference>(this.resourceUrl, reference, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReference>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReference[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
