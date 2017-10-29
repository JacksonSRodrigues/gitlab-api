import 'isomorphic-fetch';
import Frisbee from 'frisbee';
const ACCESS_TOKEN = 'qjP1UJavDqPSkDSBxz6r';

export const service: Frisbee = new Frisbee({
    baseURI: 'https://gitlab.com/api/v4',
    headers: {
        'PRIVATE-TOKEN': ACCESS_TOKEN
    }
});