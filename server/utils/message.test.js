const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Santiago', text = 'Saludo de bienvenida';
        const message = generateMessage(from, text);

        expect(message.createdAt).toEqual(expect.any(Number));
        expect(message).toMatchObject({ from, text });
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        const from = 'Santiago', latitude = 8.6704382, longitude = -74.0300122;
        const expectedUrl = `https://google.com/maps?q=8.6704382,-74.0300122`;
        const locationMessage = generateLocationMessage(from, latitude, longitude);

        expect(locationMessage.createdAt).toEqual(expect.any(Number));
        expect(locationMessage).toMatchObject({ from, url: expectedUrl });
    })
})