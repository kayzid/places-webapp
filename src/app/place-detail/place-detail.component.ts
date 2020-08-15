import { Component, OnInit, HostListener } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PlaceDetails} from '../placeDetails';
import {PlaceService} from '../place.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
  public innerWidth: any;

  placeDetail:PlaceDetails;


  constructor(  private route : ActivatedRoute,
    private placeService: PlaceService,
    private location:Location) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.getPlaceById();
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(`Width:${this.innerWidth}`);
    this.innerWidth = window.innerWidth;
    this.getPlaceById();
  }


  getPlaceById():void{
    const id=+this.route.snapshot.paramMap.get('id');
    console.log(`Fetching place with id ${id}`);
    this.placeService.getPlacesById(id).subscribe(placeDetail => {
      console.log(placeDetail);
      if(this.innerWidth < 300){
        const urlParts=placeDetail.imageUrl.split('/');
        placeDetail.imageUrl=`${urlParts[0]}//${urlParts[2]}/id/${urlParts[4]}/100/150.jpg`;        
      }
      else if(this.innerWidth >900){
        const urlParts=placeDetail.imageUrl.split('/');
        placeDetail.imageUrl=`${urlParts[0]}//${urlParts[2]}/id/${urlParts[4]}/500/650.jpg`;   
      }
      this.placeDetail=placeDetail
    });
    
  }

  goBack(): void {
    this.location.back();
  }
}
