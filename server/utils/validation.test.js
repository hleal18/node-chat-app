const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const param = 12345;
        expect(isRealString(param)).toBeFalsy();
    });

    it('should reject string with only space', () => {
        const param = '      ';
        expect(isRealString(param)).toBeFalsy();
    });

    it('should allow string with non-space characters', () => {
        const param = 'Buenos días  ';
        expect(isRealString(param)).toBeTruthy();
    });
})