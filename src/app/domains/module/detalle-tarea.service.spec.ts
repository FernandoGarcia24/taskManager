import { TestBed } from '@angular/core/testing';

import { DetalleTareaService } from './detalle-tarea.service';

describe('DetalleTareaService', () => {
  let service: DetalleTareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleTareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
