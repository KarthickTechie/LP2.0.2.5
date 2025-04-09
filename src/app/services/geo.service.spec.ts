import { TestBed } from '@angular/core/testing';
import { GeoService } from './geo.service';
import { Geolocation, Position } from '@capacitor/geolocation';

fdescribe('GeoService', () => {
  let service: GeoService;
  let geoSpyObj: jasmine.SpyObj<typeof Geolocation>;

  beforeEach(() => {
    geoSpyObj = jasmine.createSpyObj('Geolocation', ['checkPermissions', 'getCurrentPosition']);

    TestBed.configureTestingModule({
      providers: [{ provide: Geolocation, useValue: geoSpyObj }]
    });
    service = TestBed.inject(GeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Position coordinates when permissions are granted', async () => {
    // Mock checkPermissions
    geoSpyObj.checkPermissions.and.returnValue(Promise.resolve({ location: 'granted',coarseLocation:"denied" }));
    console.log('Mocked checkPermissions to return:', { location: 'granted' });

    // Mock getCurrentPosition
    const mockPosition: Position = {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
        accuracy: 10,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: Date.now()
    };
    geoSpyObj.getCurrentPosition.and.returnValue(Promise.resolve(mockPosition));
    console.log('Mocked getCurrentPosition to return:', mockPosition);

    try {
      const result = await service.getLocation();
      console.log('Service returned:', result);
      expect(geoSpyObj.checkPermissions).toHaveBeenCalledTimes(1);
      expect(geoSpyObj.getCurrentPosition).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPosition);
    } catch (error) {
      console.error('Service threw error:', error);
      throw error; // Re-throw to fail the test explicitly
    }
  });

  it('should reject with null when permissions are not granted', async () => {
    geoSpyObj.checkPermissions.and.returnValue(Promise.resolve({ location: 'denied',coarseLocation:'denied' }));
    await expectAsync(service.getLocation()).toBeRejectedWith(
      new Error('Location permission not granted')
    );
    expect(geoSpyObj.getCurrentPosition).not.toHaveBeenCalled();
  });
});