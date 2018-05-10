import { Selector, ClientFunction } from 'testcafe';
import config from './config';

fixture `Assertions`
    .page `${config.baseUrl}/health`;

test('Slider is working as expected', async t => {
    const $carousel = Selector('#aside-carousel');
    const $nextButton =  Selector('#aside-carousel .icon-next');
    const $prevButton = Selector('#aside-carousel .icon-prev');
    const $toggleCarousel = Selector('#aside-carousel .toggleCarousel');
    if(await $carousel.exists) {
        await t
            .click($toggleCarousel)
            .expect( Selector('#aside-carousel .item').nth(0).hasClass('active')).eql(true)
            .debug()
            .click($nextButton)
            .expect( Selector('#aside-carousel .item').nth(1).hasClass('active')).eql(true)
    }
});
