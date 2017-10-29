import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Diamond } from "../objectModels/diamond.model";

@Injectable()

export class DiamondsService{

    constructor(private httpClient:HttpClient) {
    }        
    

    public getDiamondsCurrency(cur) :Observable<any>
    {
        const body = JSON.stringify({cur:cur});
        
        return this.httpClient.post('http://localhost:3000/diamonds/getDiamondsCurrency', body, {headers: new HttpHeaders().set('Content-Type','application/json')})
        // .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error)); 

    }

    public getDiamonds() :Observable<any>
    {
        return this.httpClient.get('http://localhost:3000/diamonds/getDiamonds')
        // .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error)); 

    }

    public addDiamond(diamond:Diamond) :Observable<any>{

        const body = JSON.stringify(diamond);
        return this.httpClient.post('http://localhost:3000/diamonds/add-diamond', body, {headers: new HttpHeaders().set('Content-Type','application/json')})
            // .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error)); 
    }

    public getDiamondByDate(jsonDate) :Observable<any>{
        
                const body = JSON.stringify(jsonDate);
                return this.httpClient.post('http://localhost:3000/diamonds/getDiamondsByDate', body, {headers: new HttpHeaders().set('Content-Type','application/json')})
                // .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error)); 
        
            }

    

}