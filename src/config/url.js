//hosts: 47.104.219.174 jxlive.aplusx.com
const FORMAL_WEBSITE_HOSTNAME = 'jiaxiao.aplusx.com';
const FORMAL_NOCDN_WEBSITE_HOSTNAME = 'jxlive.aplusx.com';
const baseUrls = {
	[ FORMAL_WEBSITE_HOSTNAME ]: `https://${FORMAL_WEBSITE_HOSTNAME}`,
	[ FORMAL_NOCDN_WEBSITE_HOSTNAME ]: `https://${FORMAL_NOCDN_WEBSITE_HOSTNAME}`,
	test: 'https://jxapitest.aplusx.com',
	mock: '',
};
const activityBaseUrls = {
	[ FORMAL_WEBSITE_HOSTNAME ]: 'https://jiaxiao.aplusx.com',
	// [FORMAL_NOCDN_WEBSITE_HOSTNAME]: 'https://jxlive.aplusx.com',
	test: 'https://jxactivetest.aplusx.com',
	mock: '',
};

export const BASE_URL = baseUrls[ window.location.hostname ] || baseUrls.test;
export const ACTIVITY_BASE_URL = activityBaseUrls[ window.location.hostname ] || activityBaseUrls.test;

export const MOCK_BASE_URL = 'http://easymock.aplusx.com/mock/5cff167247504b5ec79d6fa0';
