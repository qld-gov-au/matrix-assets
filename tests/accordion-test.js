import { Selector, ClientFunction } from 'testcafe';
import config from './config';

fixture `Assertions`
    .page `${config.baseUrl}/health/services/travel/subsidies/ptss-subsidies`;

test('Accordion show and hide is working as expected', async t => {
    const el = Selector('.collapsing-section').nth(0);
    const arrowel = Selector('.arrow').nth(0);

    await t
        .expect(el.getStyleProperty('max-height')).eql('0px')
        .click(arrowel)
        .expect(el.getStyleProperty('max-height')).notEql('0px')
});

