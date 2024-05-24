import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

const DARKMODE: string = "DARKMODE";

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {
  private darkmodeEnabled: WritableSignal<boolean>;
  protected readonly darkmode$: Signal<boolean>;

  readonly enabled: Signal<boolean>;
  
  constructor() {
    this.darkmodeEnabled = signal(this.isEnabled());
    this.darkmode$ = computed(() => this.darkmodeEnabled());
    this.enabled = this.darkmodeEnabled.asReadonly()
  }

  public isEnabled(): boolean {
    const enabled = LocalStorageService.getValue(DARKMODE);
    return enabled == 'true';
  }

  public toggleDarkmode(): boolean {
    this.darkmodeEnabled.set(!this.darkmodeEnabled());
    LocalStorageService.setItem(DARKMODE, (this.darkmodeEnabled()).toString());
    return this.isEnabled();
  }
}
