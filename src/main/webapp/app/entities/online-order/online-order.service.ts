import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOnlineOrder } from 'app/shared/model/online-order.model';

type EntityResponseType = HttpResponse<IOnlineOrder>;
type EntityArrayResponseType = HttpResponse<IOnlineOrder[]>;

@Injectable({ providedIn: 'root' })
export class OnlineOrderService {
  public resourceUrl = SERVER_API_URL + 'api/online-orders';

  constructor(protected http: HttpClient) {}

  create(onlineOrder: IOnlineOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(onlineOrder);
    return this.http
      .post<IOnlineOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(onlineOrder: IOnlineOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(onlineOrder);
    return this.http
      .put<IOnlineOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOnlineOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOnlineOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(onlineOrder: IOnlineOrder): IOnlineOrder {
    const copy: IOnlineOrder = Object.assign({}, onlineOrder, {
      orderDate: onlineOrder.orderDate != null && onlineOrder.orderDate.isValid() ? onlineOrder.orderDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.orderDate = res.body.orderDate != null ? moment(res.body.orderDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((onlineOrder: IOnlineOrder) => {
        onlineOrder.orderDate = onlineOrder.orderDate != null ? moment(onlineOrder.orderDate) : null;
      });
    }
    return res;
  }
}
