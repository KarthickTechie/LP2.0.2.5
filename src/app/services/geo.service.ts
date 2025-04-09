// import { Injectable } from '@angular/core';
// import { Geolocation, Position } from '@capacitor/geolocation';

// @Injectable({
//   providedIn: 'root'
// })
// export class GeoService {

//   constructor() { 
//   }

//   async getLocation(){
//     try{
//     const position = await Geolocation.checkPermissions()
//     if(position.location === 'granted'){

//       const coordinates = await Geolocation.getCurrentPosition();
//       return coordinates
//     }else{
//       return Promise.reject(null)
//     }
//   }catch(error){
//     console.log(error)
//     return Promise.reject(null)

//   }

// }
// }

import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  constructor() {}

  async getLocation(): Promise<Position> {
    try {
      const permission = await Geolocation.checkPermissions();
      if (permission.location == 'granted') {
        const coordinates = await Geolocation.getCurrentPosition();
        return coordinates;
      } else {
        return Promise.reject(new Error('Location permission not granted'));
      }
    } catch (error) {
      console.error('Error getting location:', error);
      return Promise.reject(error); // Pass the actual error instead of null
    }
  }
}