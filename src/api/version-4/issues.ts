import { service } from './service';
import { Issue } from '../models';
import { Visibility, SortOrder, Orderby, Scope, State } from '../models';
import { REST } from '../common';

export namespace Issues {


  export function getAll(state: State = undefined,
    scope: Scope = Scope.ALL,
    labels: string[] = undefined,
    milestoneTitle: string = undefined,
    orderBy: (Orderby.CREATED_AT | Orderby.UPDATED_AT) = Orderby.CREATED_AT,
    sort: SortOrder = SortOrder.DESCENDING,
    search: string = undefined,
    milestoneIds: string[] = undefined,
    authoredBy: string = undefined,
    assignedTo: string = undefined
  ): Promise<Issue[]> {
    let params = [];
    params.push(REST.QueryParam.createQuery('state', state));
    params.push(REST.QueryParam.createQuery('scope', scope));
    params.push(REST.QueryParam.createQuery('labels', labels ? labels.join(',') : undefined));
    params.push(REST.QueryParam.createQuery('milestone', milestoneTitle));
    params.push(REST.QueryParam.createQuery('order_by', orderBy));
    params.push(REST.QueryParam.createQuery('sort', sort));
    params.push(REST.QueryParam.createQuery('search', search));
    params.push(...(milestoneIds || []).map(iid => REST.QueryParam.createQuery('iids[]', iid)));
    params.push(REST.QueryParam.createQuery('author_id', authoredBy));
    params.push(REST.QueryParam.createQuery('assignee_id', assignedTo));

    return new Promise((resolve, reject) => {
      service.get(`/issues?${REST.QueryParam.join(params)}`)
        .then((result) => resolve(result.body))
        .catch((error) => reject(error));
    });
  }

  export function getAllOfProject(projectId: string,
    state: State = undefined,
    scope: Scope = Scope.ALL,
    labels: string[] = undefined,
    milestoneTitle: string = undefined,
    sort: SortOrder = SortOrder.DESCENDING,
    search: string = undefined,
    milestoneIds: string[] = undefined,
    authoredBy: string = undefined,
    assignedTo: string = undefined
  ): Promise<Issue[]> {
    let params = [];
    params.push(REST.QueryParam.createQuery('state', state));
    params.push(REST.QueryParam.createQuery('scope', scope));
    params.push(REST.QueryParam.createQuery('labels', labels ? labels.join(',') : undefined));
    params.push(REST.QueryParam.createQuery('milestone', milestoneTitle));
    params.push(REST.QueryParam.createQuery('sort', sort));
    params.push(REST.QueryParam.createQuery('search', search));
    params.push(...(milestoneIds || []).map(iid => REST.QueryParam.createQuery('iids[]', iid)));
    params.push(REST.QueryParam.createQuery('author_id', authoredBy));
    params.push(REST.QueryParam.createQuery('assignee_id', assignedTo));

    return new Promise((resolve, reject) => {
      service.get(`/projects/${projectId}/issues?${REST.QueryParam.join(params)}`)
        .then((result) => resolve(result.body))
        .catch((error) => reject(error));
    });
  }

  export function getOneOfProject(projectId: string,
    issueId: string): Promise<Issue[]> {

    return new Promise((resolve, reject) => {
      service.get(`/projects/${projectId}/issues/${issueId}`)
        .then((result) => resolve(result.body))
        .catch((error) => reject(error));
    });
  }

  export function create(projectId: string,
    title: string,
    description?: string,
    confidential: boolean = false,
    assigneeIds?: string[],
    milestoneId?: string,
    labels?: string[],
    dueDate?: Date
  ): Promise<Issue> {
    let params = [];

    return new Promise((resolve, reject) => {
      service.post(`/projects/${projectId}/issues?${params.join('&')}`)
        .then((result) => resolve(result.body))
        .catch((error) => reject(error));
    });
  }

}
