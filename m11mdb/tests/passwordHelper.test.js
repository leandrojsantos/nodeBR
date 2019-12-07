const assert = require('assert');
const PasswordHelper = require('../src/helpers/passwordHelper');

const SENHA = 'testPss@pss';
const HASH = '$2b$04$xD/qMwMqBSa7kTB1.lmdVOvNW/XcFcQBTMZ4SYo0QJ85gwXmWIhQy'

describe('==> UserHelper Gera e Compara Tokens', function () {

    it('t1gerarHash', async () => {
        const result = await PasswordHelper.hashPassword(SENHA);
        console.log('result', result)
        assert.ok(result.length > 10);
    });

    it('t2compararHash', async () => {
        const result = PasswordHelper.comparePassword(SENHA, HASH)
        console.log('result', result)
        assert.ok(result)
    })

});