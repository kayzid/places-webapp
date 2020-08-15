

export interface PlaceDetails {
    id: Number;
    name: String;
    country:String;
    imageUrl:String;
    city:String;
    descriptions:String;    
    lat:number;
    long:number;
    numberOfPeople:number;
    minStay:number;
    numBedroom:number;
    numBathroom:number;
    numPeople:number;
    fees:Fee[];
    prices:Price;

}
export interface Fee {
    amount:String;
    type:String
}


export interface Price {
    dateSeen:String;
    dateValidEnd:Date;
    dateValidStart:Date;
    minStay:String;
    period:String;
    price:String;
}
