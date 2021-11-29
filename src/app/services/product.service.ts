import { Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { IProduct } from '../models/product'
import { catchError, tap, map } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class ProductService{

    private productUrl = 'assets/data.json'

    constructor(private http: HttpClient) {
    }
    getProducts():Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(tap(data => {
            console.log('All', JSON.stringify(data))
        }), catchError(this.handError))
    }

    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts()
            .pipe(
                map((products: IProduct[]) => products.find(p => p.id === id))
            );
    }


    private handError(err: HttpErrorResponse){
        let errMessage =''
        if(err.error.message instanceof ErrorEvent){
            errMessage = `An error occurred ${err.error.message}`
        }else{
            errMessage = `Server returned ${err.status} , error message: ${err.message}`
        }

        console.log(errMessage)
        return throwError(errMessage)
    }

}

