import { Test, TestingModule } from '@nestjs/testing';
import { SalesHistoryController } from './sales-history.controller';
import { SalesHistoryService } from './sales-history.service';

describe('SalesHistoryController', () => {
  let controller: SalesHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesHistoryController],
      providers: [SalesHistoryService],
    }).compile();

    controller = module.get<SalesHistoryController>(SalesHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
