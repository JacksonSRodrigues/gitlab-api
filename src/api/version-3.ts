import 'isomorphic-fetch';
import Frisbee from 'frisbee';
import { Project, Milestone, Issue, TimeStatus, Note } from './models';

export namespace V3 {
  'use strict';
  const ACCESS_TOKEN = 'qjP1UJavDqPSkDSBxz6r';

  const api: Frisbee = new Frisbee({
    baseURI: 'https://gitlab.com/api/v3',
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

      let currentMilestone: Milestone = activeMilestones.reduce((aggregate, milestone): Milestone => {
        if (milestone.dueDate >= date) {
          if (!aggregate || aggregate.dueDate > milestone.dueDate) {
            aggregate = milestone;
          }
        }
        return aggregate;
      }, undefined);

      currentMilestone ? resolve(currentMilestone) : reject(undefined);
    });
  }

  export function getMilestoneIssues(projectId: string, mileStoneId: string): Promise<Issue[]> {
    return new Promise(async (resolve, reject) => {
      api.get(`/projects/${projectId}/milestones/${mileStoneId}/issues`).then(result => {
        resolve(result.body);
      });
    });
  }

  export function getTimeStatus(projectId: string, issueId: string): Promise<TimeStatus> {
    return new Promise(async (resolve, reject) => {
      let notes: Note[] = await getComments(projectId, issueId);
      let progressRegex = /#progress( *)(:?)( *)\d*%/g;
      let progress = notes.filter(note => note.body && note.body.match(progressRegex))
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        .reduce((accumulate: any[], note) => {
          return accumulate.concat(note.body.match(progressRegex));
        }, [])
        .reduce((accumulate: any[], individualProgress) => {
          console.log(individualProgress);
          return accumulate.concat(individualProgress.match(/\d*%/g));
        }, []);
        console.log(progress);
      resolve(progress);
    });
  }

  export function getComments(projectId: string, issueId: string): Promise<Note[]> {
    return new Promise(async (resolve, reject) => {
      api.get(`/projects/${projectId}/issues/${issueId}/notes`).then(result => {
        resolve(result.body.map(note => {
          let newNote: Note = Object.assign({}, note);
          newNote.createdAt = new Date(note.created_at);
          return newNote;
        }));
      });
    });
  }



}