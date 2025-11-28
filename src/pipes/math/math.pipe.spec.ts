import { MathPipe } from './math.pipe';

describe('MathPipe', () => {
  let pipe: MathPipe;

  beforeEach(() => {
    pipe = new MathPipe();
  });

  describe('Pipe Creation', () => {
    it('should create the pipe', () => {
      expect(pipe).toBeTruthy();
    });
  });

  describe('Rounding functionality', () => {
    it('should round a decimal number correctly', () => {
      expect(pipe.transform(100.45678, 'round')).toBe(100);
    });

    it('should round up when decimal is >= 0.5', () => {
      expect(pipe.transform(100.5, 'round')).toBe(101);
    });

    it('should fallback to round for unknown operation', () => {
      expect(pipe.transform(100.6, 'invalid' as any)).toBe(101);
    });
  });

  describe('Edge cases', () => {
    it('should return 0 when value is 0', () => {
      expect(pipe.transform(0, 'round')).toBe(0);
    });

    it('should return 0 when value is null', () => {
      expect(pipe.transform(null as any, 'round')).toBe(0);
    });

    it('should return 0 when value is undefined', () => {
      expect(pipe.transform(undefined as any, 'round')).toBe(0);
    });
  });
});
