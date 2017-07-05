import 'isomorphic-fetch';
import Frisbee from 'frisbee';
import { Project, Milestone, Issue, TimeStatus } from './models';

export namespace V4 {
  'use strict';
  const ACCESS_TOKEN = 'qjP1UJavDqPSkDSBxz6r';

  const api: Frisbee = new Frisbee({
    baseURI: 'https://gitlab.com/api/v4',
    headers: {
      'PRIVATE-TOKEN': ACCESS_TOKEN
    }
  });

  export function getProjects(): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      api.get('/projects?owned=true').then(result => {
        resolve(result.body);
      });
    });
  }

  export function getProject(name: string): Promise<Project> {
    return new Promise(async (resolve, reject) => {
      const projects = await getProjects();
      const matchingProjects = projects.filter(project => (name === project.name));
      if (matchingProjects.length > 0) {
        resolve(matchingProjects[0]);
      } else {
        reject(undefined);
      }
    });
  }

  export function getActiveMilestones(projectId: string): Promise<Milestone[]> {
    return new Promise((resolve, reject) => {
      api.get(`/projects/${projectId}/milestones?state=active`).then(result => {
        resolve(result.body.map(item => {
          let mileStone = {
            id: '',
            title: '',
            description: '',
            dueDate: undefined,
            startDate: undefined
          };
          mileStone.id = item.id;
          mileStone.title = item.title;
          mileStone.description = item.description;
          mileStone.dueDate = new Date(item.due_date);
          mileStone.startDate = new Date(item.start_date);
          return mileStone;
        }));
      });
    });
  }

  export function getCurrentMilestone(projectId: string, date: Date): Promise<Milestone> {
    return new Promise(async (resolve, reject) => {
      let activeMilestones = await getActiveMilestones(projectId);
      let matchingMilestones = activeMilestones.filter(milestone => (milestone.startDate <= date && milestone.dueDate >= date));
      if (matchingMilestones.length > 0) {
        resolve(matchingMilestones[0]);
      } else {
        reject(undefined);
      }
    });
  }

  export function getMilestoneIssues(projectId: string, mileStoneId: string): Promise<Issue[]> {
    return new Promise(async (resolve, reject) => {
      api.get(`/projects/${projectId}/milestones/${mileStoneId}/issues`).then(result => {
        resolve(result.body);
      });
    });
  }

  export function getTimeStatus(projectId: string, issueId: string):  Promise<TimeStatus> {
    return new Promise(async (resolve, reject) => {
      api.get(`/projects/${projectId}/issues/${issueId}/time_stats`).then(result => {
        let timeStatus: TimeStatus  = {estimatedTime: undefined, spentTime: undefined};
        console.log('TIME_PROGRESS', result);
        timeStatus.spentTime = result.body.total_time_spent;
        timeStatus.estimatedTime = result.body.time_estimate;
        resolve(timeStatus);
      });
    });
  }
}