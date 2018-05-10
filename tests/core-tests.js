import { Selector, ClientFunction } from 'testcafe';
import config from './config';

fixture `Assertions`
    .page `${config.baseUrl}/health`;

test('Check if all images exist', async t => {
    var images        = Selector('img');
    var count         = await images.count;
    var requestsCount = 0;
    var statuses      = [];

    var getRequestResult = ClientFunction(url => {
        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function () {
                resolve(xhr.status);
            };
            xhr.send(null);
        });
    });
    for (var i = 0; i < count; i++) {
        var url = await images.nth(i).getAttribute('src');
        if (!url.startsWith('data')) {
            requestsCount++;
            statuses.push(await getRequestResult(url));
        }
    }
    await t.expect(requestsCount).eql(statuses.length);
    for (const status of statuses)
        await t.expect(status).eql(200);
});


test('Breadcrumb is present on the page', async t => {
    const $breadcrumb = Selector('#qg-breadcrumb').exists;
    const $breadcrumbList = Selector('#qg-breadcrumb ol li');

    await t
        .expect($breadcrumb).ok()
        .expect($breadcrumbList.count).eql(3)
});

