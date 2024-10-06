import { Test, TestingModule } from '@nestjs/testing';
import { SalesHistoryService } from './sales-history.service';

describe('SalesHistoryService', () => {
  let service: SalesHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesHistoryService],
    }).compile();

    service = module.get<SalesHistoryService>(SalesHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
