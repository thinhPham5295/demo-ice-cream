import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPrizeHistory } from 'app/shared/model/prize-history.model';

type EntityResponseType = HttpResponse<IPrizeHistory>;
type EntityArrayResponseType = HttpResponse<IPrizeHistory[]>;

@Injectable({ providedIn: 'root' })
export class PrizeHistoryService {
  public resourceUrl = SERVER_API_URL + 'api/prize-histories';

  constructor(protected http: HttpClient) {}

  create(prizeHistory: IPrizeHistory): Observable<EntityResponseType> {
    return this.http.post<IPrizeHistory>(this.resourceUrl, prizeHistory, { observe: 'response' });
  }

  update(prizeHistory: IPrizeHistory): Observable<EntityResponseType> {
    return this.http.put<IPrizeHistory>(this.resourceUrl, prizeHistory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPrizeHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrizeHistory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
