import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

const DARKMODE: string = "DARKMODE";

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {
  
  constructor() { }

  public isEnabled(): boolean {
    const enabled = LocalStorageService.getValue(DARKMODE);
    return enabled == 'true';
  }

  public toggleDarkmode(): boolean {
    let darkmodeEnabled = this.isEnabled();
    LocalStorageService.setItem(DARKMODE, (!darkmodeEnabled).toString());
    return this.isEnabled();
  }
}
