import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IProduct } from '../domain/product';

@Injectable()
export class ProductService {
    // private _productUrl = './assets/api/products/products.json';
    private _productUrl = 'http://localhost:3000/products'; // CONNECT TO NodeJS/Mondb Backoffice

    constructor(private _http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this._http.get<IProduct[]>(this._productUrl)
         //   .map((response: Response) => <IProduct[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }
    addProduct(product: IProduct): Observable<any> {
      // const options = new RequestOptions({
      //      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
      //  });
       return this._http.post(this._productUrl, product)
                 //  .map((response: Response) => response.json())
                 .do (() => {
                      console.log('Voici l objet envoye par POST: ' +  JSON.stringify(product) );
                 })
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

   }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
