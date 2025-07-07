import { formatCurrency } from "../scripts/utils/money.js";

describe('test suite: format currency', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('works with zero', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('rounds up', () => {
        expect(formatCurrency(2000.6)).toEqual('20.01');
    });
    it('rounds down', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00');
    });
    it('rounds up with .5', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});