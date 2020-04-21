import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
@Injectable({
    providedIn: 'root'
})
export class DataService {
    ordersUrl = 'api2/v1/orders';
    saveOrderUrl = 'api2/v1/save-order';
    donorUrl = 'api2/v1/donors';
    siteUrl = 'api2/v1/sites';
    testTypeUrl = 'api2/v1/NonDOTTestTypes';
    regTypes = 'api2/v1/regs';
    compNameUrl = 'api2/v1/companyName';
    locationCodesUrl = 'api2/v1/locationCodes';
    getOrderUrl = 'api2/v1/order';

    constructor(private http: HttpClient, private authService: AuthService, @Inject('API_BASE_URL') apibaseUrl: string) {
        this.ordersUrl = apibaseUrl + this.ordersUrl;
        this.saveOrderUrl = apibaseUrl + this.saveOrderUrl;
        this.donorUrl = apibaseUrl + this.donorUrl;
        this.siteUrl = apibaseUrl + this.siteUrl;
        this.testTypeUrl = apibaseUrl + this.testTypeUrl;
        this.regTypes = apibaseUrl + this.regTypes;
        this.compNameUrl = apibaseUrl + this.compNameUrl;
        this.locationCodesUrl = apibaseUrl + this.locationCodesUrl;
        this.getOrderUrl = apibaseUrl + this.getOrderUrl;
    }

    // Get data from server for admin list page  (get)
    getOrder(status: any) {
        
        return this.http.get(this.ordersUrl, { params: new HttpParams().set('statusFilter', status) });
    }

    getAnOrder(id: any) {
        return this.http.get(this.getOrderUrl + "/" + id);
    }

    // post wizard data (post)
    postOrder(data: any) {
        return this.http.post(this.saveOrderUrl, data, httpOptions);
    }

    // get donor search data  (get)
    getDonordata(data: any, param: boolean) {
        if (param) {
            return this.http.get(this.donorUrl, { params: new HttpParams().set('id', data) });
        } else {
            return this.http.get(this.donorUrl, { params: new HttpParams().set('name', data) });
        }
    }

    getDonoralldata() {
        return this.http.get(this.donorUrl);
    }

    // get site data  (get)
    getSitedata(data: any) {
        return this.http.get(this.siteUrl, { params: new HttpParams().set('searchText', data) });
    }

    getSiteAlldata() {
        return this.http.get(this.siteUrl);
    }

    // get test types
    getTestTypesdata() {
        return this.http.get(this.testTypeUrl);
    }

    getRegTypes() {
        return this.http.get(this.regTypes);
    }

    getCompName() {
        return this.http.get(this.compNameUrl);
    }

    getLocationCodes() {
        return this.http.get(this.locationCodesUrl);
    }

    getSitedatawithparams(data: any, range: string) {
        const params = new HttpParams().set('searchText', data)
            .set('range', range);
        return this.http.get(this.siteUrl, { params });
    }

    // resend notification (post)
    resendNotification(id: any, data: any) {
        const resendUrl = this.ordersUrl + '/' + id + '/resend';
        return this.http.post(resendUrl, data, httpOptions);
    }

    // cancel notification (post)
    cancelNotification(id: any) {
        const cancelUrl = this.ordersUrl + '/' + id + '/cancel';
        return this.http.post(cancelUrl, id, httpOptions);
    }
}
