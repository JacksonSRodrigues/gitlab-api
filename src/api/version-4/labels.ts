import { service } from './service';
import { Label } from '../models';
import { Visibility, SortOrder, Orderby } from '../models';
import { REST } from '../common';
const urlencode = require('urlencode');

export namespace Labels {

  export function getAll(projectId: string): Promise<Label[]> {
    return new Promise((resolve, reject) => {
      service.get(`/projects/${projectId}/labels`)
        .then((result) => resolve(result.body))
        .catch((error) => reject(error));
    });
  }

  export function create(projectId: string,
    name: string,
    color: string,
    description?: string): Promise<Label> {

    let params = [];
    params.push(REST.QueryParam.createQuery('name', name));
    params.push(REST.QueryParam.createQuery('color', urlencode(color)));
    params.push(REST.QueryParam.createQuery('description', description));
    console.log(`/projects/${projectId}/labels?`, params, REST.QueryParam.join(params));
    return new Promise((resolve, reject) => {
      service.post(`/projects/${projectId}/labels?${REST.QueryParam.join(params)}`)
        .then((result) => resolve(result.body))
        .catch((error) => reject(error));
    });
  }
}