import { V3 as api } from './api';

export class ReportGenerator {

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

result();