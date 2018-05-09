import { Selector, ClientFunction } from 'testcafe';
fixture `Assertions`
    .page `https://oss.clients.squiz.net/health/services/travel/subsidies/ptss-subsidies`;

test('Accordion is working as expected', async t => {
    const el = Selector('.collapsing-section').nth(0);
    const arrowel = Selector('.arrow').nth(0);

    await t
        .expect(el.getStyleProperty('max-height')).eql('120x')
        .click(arrowel)
        .expect(el.getStyleProperty('max-height')).notEql('0px')
});
