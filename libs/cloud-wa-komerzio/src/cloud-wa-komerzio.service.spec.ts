import { Test, TestingModule } from '@nestjs/testing';
import { CloudWaKomerzioService } from './cloud-wa-komerzio.service';

describe('CloudWaKomerzioService', () => {
  let service: CloudWaKomerzioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudWaKomerzioService],
    }).compile();

    service = module.get<CloudWaKomerzioService>(CloudWaKomerzioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
