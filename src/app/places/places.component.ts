import { Component, OnInit, HostListener } from '@angular/core';
import {Place} from '../place';
import {PlaceService} from '../place.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  places:Place[];
  pageNumber:1;
  constructor(private placeService:PlaceService) { }
  public innerWidth: any;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.getPlaces(this.pageNumber);
    
    console.log(`Width:${this.innerWidth}`);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(`Width:${this.innerWidth}`);
    this.innerWidth = window.innerWidth;
    this.getPlaces(this.pageNumber);
  }

  getPlaces(page:number):void {
    if(page === undefined)
      page=1;
    console.log(`Number : ${page}`);
    this.placeService.getPlaces(page).subscribe(places => {
      places.forEach(place => {
        if(this.innerWidth < 300){
          const urlParts=place.imageUrl.split('/');
          place.imageUrl=`${urlParts[0]}//${urlParts[2]}/id/${urlParts[4]}/100/250.jpg`;  
        }
        else if(this.innerWidth >900){
          const urlParts=place.imageUrl.split('/');
          place.imageUrl=`${urlParts[0]}//${urlParts[2]}/id/${urlParts[4]}/300/350.jpg`;   
        }
      });      
      this.places=places;
    });
  }

  getPagesOnEvent(event) :void {
    
    if(event.pageIndex !== undefined)
      this.pageNumber=event.pageIndex + 1;
    
    console.log(this.pageNumber);
    this.getPlaces(this.pageNumber);
    
  }
 

  
}
