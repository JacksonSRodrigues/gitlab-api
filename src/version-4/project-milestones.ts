
import { service } from './service';
import { Milestone, Issue } from '../models';
import { State } from '../models';
import { REST } from '../common';

export namespace ProjectMilestones {

  export function getAll(projectId: string,
    state: State = undefined,
    search: string = undefined,
    milestoneIds: string[] = undefined,
  ): Promise<Milestone[]> {
    let params = [];
    params.push(REST.QueryParam.createQuery('state', state));
    params.push(REST.QueryParam.createQuery('search', search));
    params.push(...(milestoneIds || []).map(iid => REST.QueryParam.createQuery('iids[]', iid)));

    return new Promise((resolve, reject) => {
      service.get(`/projects/${projectId}/milestones?${REST.QueryParam.join(params)}`)
        .then((result) => resolve(result.body))
        .catch((error) => reject(error));
    });
  }

  export function getOne(projectId: string,
    milestoneId: string
  ): Promise<Milestone[]> {

    return new Promise((resolve, reject) => {
      service.get(`/projects/${projectId}/milestones/${milestoneId}`)
        .then((result) => resolve(result.body))
        .catch((error) => reject(error));
    });
  }

  export function create(projectId: string,
    title: string,
    description?: string,
    dueDate?: Date,
    startDate?: Date): Promise<Milestone> {
    let params = [];

    params.push(REST.QueryParam.createQuery('title', title));
    params.push(REST.QueryParam.createQuery('description', description));
    params.push(REST.QueryParam.createQuery('due_date', dueDate && dueDate.toDateString()));
    params.push(REST.QueryParam.createQuery('start_date', startDate && startDate.toDateString()));


    return new Promise((resolve, reject) => {
      service.post(`/projects/${projectId}/milestones?${params.join('&')}`)
        .then((result) => resolve(result.body))
        .catch((error) => reject(error));
    });
  }

  export function edit(projectId: string,
    milestoneId: string,
    title?: string,
    description?: string,
    dueDate?: Date,
    startDate?: Date,
    stateEvent?: string): Promise<Milestone> {
    let params = [];

    params.push(REST.QueryParam.createQuery('title', title));
    params.push(REST.QueryParam.createQuery('description', description));
    params.push(REST.QueryParam.createQuery('due_date', dueDate && dueDate.toDateString()));
    params.push(REST.QueryParam.createQuery('start_date', startDate && startDate.toDateString()));
    params.push(REST.QueryParam.createQuery('state_event', stateEvent));

    return new Promise((resolve, reject) => {
      service.post(`/projects/${projectId}/milestones/${milestoneId}?${params.join('&')}`)
        .then((result) => resolve(result.body))
        .catch((error) => reject(error));
    });
  }

  export function getIssues(projectId: string,
    milestoneId: string): Promise<Issue[]> {

    return new Promise((resolve, reject) => {
      service.get(`/projects/${projectId}/milestones/${milestoneId}/issues`)
        .then((result) => resolve(result.body))
        .catch((error) => reject(error));
    });
  }

}