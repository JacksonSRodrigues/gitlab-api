import { V3 as api } from './api';
import { V4 } from './api';

import { Project, Label } from './api';

export class ReportGenerator {

}

async function resultV4() {
    let neededLabels = [{ name: 'Epic', color: '#FF0000' },
    { name: 'UserStory', color: '#00FF00' },
    { name: 'task', color: '#00FF00' }];
    console.log('v4');
    const projects: Project[] = await V4.Projects.getAll();
    const availables: Label[] = await V4.Labels.getAll(projects[0].id);
    const missingLables = neededLabels.filter(label => availables.find(item => item.name === label.name) === undefined);
    console.log('Missing Labels', missingLables);
    console.log('');
    missingLables.map(async newLabel => {
        let label = await V4.Labels.create(projects[0].id, newLabel.name, newLabel.color);
        console.log('Label', label);
        console.log('');
    });
}

async function result() {

    let project = await api.getProject('status-generator-project');
    let milestone = await api.getCurrentMilestone(project.id, new Date());
    console.log(milestone);
    let issues = await api.getMilestoneIssues(project.id, milestone.id);
    let blogs = issues.filter(issue => issue.labels.filter(item => item === 'Blogs').length > 0);
    let demos = issues.filter(issue => issue.labels.filter(item => item === 'Demo').length > 0);
    let funActivities = issues.filter(issue => issue.labels.filter(item => item === 'Fun').length > 0);
    let learnings = issues.filter(issue => issue.labels.filter(item => item === 'Learning').length > 0);
    let completedLearning = learnings.filter(issue => issue.state === 'closed');
    let inProgressLearning = learnings.filter(issue => issue.state === 'opened');
    // console.log(inProgressLearning);
    if (inProgressLearning.length > 0) {
        api.getTimeStatus(project.id, inProgressLearning[0].iid);
    }
}

resultV4();