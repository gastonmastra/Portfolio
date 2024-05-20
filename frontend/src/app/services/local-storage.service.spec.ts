import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {  
  it('should set an item setItem(key: string, value: string): void', () => {
    const anItem = "anything";
    const aValue = "some value";
    // Ensure that anItem is not present in the localStorage before it is setted.
    expect(LocalStorageService.getValue(anItem)).toBeNull();
    LocalStorageService.setItem(anItem, aValue);
    expect(LocalStorageService.getValue(anItem)).toBeTruthy();
    expect(LocalStorageService.getValue(anItem)).toEqual(aValue);
  });

  it('should remove an item removeItem(key: string): void', () => {
    const anItem = "anything";
    const aValue = "some value";
    LocalStorageService.setItem(anItem, aValue);
    expect(LocalStorageService.getValue(anItem)).toBeTruthy();
    LocalStorageService.removeItem(anItem);
    expect(LocalStorageService.getValue(anItem)).toBeNull();
  });

  afterEach(() => {
    LocalStorageService.clear();
  });
});
