import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }
  log(message: string):void{
    const timeStamp = new Date().toLocaleDateString();
    console.log(`${message} (${timeStamp}`)
  }

  error(message: string) :void{
    console.error(`ERROR: ${message}`)
  }
}

