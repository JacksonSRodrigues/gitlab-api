import { V4 } from './api';

export class ReportGenerator {

}

async function result() {
    let project = await V4.getProject('status-generator-project');
    let milestone = await V4.getCurrentMilestone(project.id, new Date());
    let issues = await V4.getMilestoneIssues(project.id, milestone.id);
    let blogs = issues.filter(issue => issue.labels.filter(item => item === 'Blogs').length > 0);
    let demos = issues.filter(issue => issue.labels.filter(item => item === 'Demo').length > 0);
    let funActivities = issues.filter(issue => issue.labels.filter(item => item === 'Fun').length > 0);
    let learnings = issues.filter(issue => issue.labels.filter(item => item === 'Learning').length > 0);
    let completedLearning = learnings.filter(issue => issue.state === 'closed');
    let inProgressLearning = learnings.filter(issue => issue.state === 'opened');
    for (let i = 0; i < inProgressLearning.length; i++ ) {
        let learning = inProgressLearning[i];
        let timeStatus = await V4.getTimeStatus(project.id, learning.iid);
        learning.progress = timeStatus;
    }
    console.log(inProgressLearning);
}

result();