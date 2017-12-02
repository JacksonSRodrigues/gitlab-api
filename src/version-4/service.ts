import 'isomorphic-fetch';
import Frisbee from 'frisbee';

export let service: Frisbee;
export function initService(url: string = 'https://gitlab.com/api/v4', token: string = '') {
    service = new Frisbee({
        baseURI: url,
        headers: {
            'PRIVATE-TOKEN': token
        }
    });
}

export function setAccessToken(token: string) {
    initService('https://gitlab.com/api/v4', token);
}

initService();