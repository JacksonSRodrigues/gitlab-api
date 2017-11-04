import * as V4 from './version-4';
import { Project, Label, Issue, State } from './models';

export class ReportGenerator {

}

async function resultV4() {
    let project = await getProject();
    // createDefaultLabels(project);
    // createIssues(project);
    editIssue(project, '5');
}

async function getProject(): Promise<Project> {
    const projects: Project[] = await V4.Projects.getAll();
    return projects[0];
}

async function createDefaultLabels(project: Project) {
    let neededLabels = [{ name: 'Epic', color: '#FF0000' },
    { name: 'UserStory', color: '#00FF00' },
    { name: 'task', color: '#00FF00' }];
    console.log('v4');
    const availables: Label[] = await V4.Labels.getAll(project.id);
    const missingLables = neededLabels.filter(label => availables.find(item => item.name === label.name) === undefined);
    console.log('Missing Labels', missingLables);
    await missingLables.map(async newLabel => {
        let label = await V4.Labels.create(project.id, newLabel.name, newLabel.color);
        console.log('Label', label);
    });
}
async function createIssues(project: Project) {
    let newIssue = await V4.Issues.create(project.id, 'New UserStory', 'A new Story', undefined, undefined, undefined, ['UserStory'], undefined);
    console.log('New Epic', newIssue);
    let issues = await V4.Issues.getAllOfProject(project.id, State.OPENED);
    console.log('All Project Issues', issues);

}

async function editIssue(project: Project, issueID) {
    let editIssue = await V4.Issues.edit(project.id, issueID, undefined, '@sibling(#6)');
    console.log('editedIssue', editIssue);
}
resultV4();