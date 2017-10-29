import { service } from './service';
import { Label } from '../models';
import { Visibility, SortOrder, Orderby } from '../models';
import { REST } from '../common';

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
    params.push(REST.QueryParam.createQuery('color', color));
    params.push(REST.QueryParam.createQuery('description', description));

    return new Promise((resolve, reject) => {
      service.post(`/projects/${projectId}/labels?${params.join('&')}`)
        .then((result) => resolve(result.body))
        .catch((error) => reject(error));
    });
  }
}