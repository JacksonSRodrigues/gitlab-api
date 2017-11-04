import { service } from './service';
import { Project } from '../models';
import { Visibility, SortOrder, Orderby } from '../models';
import { REST } from '../common';

export namespace Projects {
    export function getAll(visibity: Visibility = Visibility.PRIVATE,
        owned: boolean = true,
        membership: boolean = true,
        sort: SortOrder = SortOrder.ASCENDING,
        orderby: Orderby = Orderby.CREATED_AT,
        search?: string): Promise<Project[]> {

        let params = [];
        params.push(REST.QueryParam.createQuery('visibility', visibity));
        params.push(REST.QueryParam.createQuery('owned', owned.toString()));
        params.push(REST.QueryParam.createQuery('membership', membership.toString()));
        params.push(REST.QueryParam.createQuery('sort', sort));
        params.push(REST.QueryParam.createQuery('order_by', orderby));
        params.push(REST.QueryParam.createQuery('search', search));

        return new Promise((resolve, reject) => {
            service.get(`/projects?${REST.QueryParam.join(params)}`)
                .then((result) => resolve(result.body))
                .catch((error) => reject(error));
        });
    }

    export function getOne(id: string): Promise<Project> {
        return new Promise((resolve, reject) => {
            service.get(`/projects/${id}`)
                .then((result) => resolve(result.body))
                .catch((error) => reject(error));
        });
    }
}
