import { Injectable } from '@angular/core';
import {Place} from './place';
import {PlaceDetails} from './placeDetails';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private placesUrl="http://127.0.0.1:3000/v1/places";
  pageEvent: PageEvent;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient:HttpClient) { }

  getPlaces(page:number):Observable<Place[]>{
    const url=`${this.placesUrl}?limit=10&page=${page}`;
    return this.httpClient.get<Place[]>(url).pipe(
      tap(_=>console.log("fetched places")),
      catchError(this.handleError<Place[]>('getPlaces',[]))
    );
  };

  getPlacesById(id:number):Observable<PlaceDetails>{
    const url=`${this.placesUrl}/${id}`;
    return this.httpClient.get<PlaceDetails>(url).pipe(
      tap(_=>console.log(`fetch place with id ${id}`)),
      catchError(this.handleError<PlaceDetails>('getPlaces'))
    );
  };




  private handleError<T>(operation='operation',result?:T){
    return (error:any):Observable<T> => {
      console.error(error);      
      return of(result as T);
    };
  }
}
