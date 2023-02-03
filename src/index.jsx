import api, { route } from "@forge/api";
import ForgeUI, { render, AdminPage, Fragment, Text, Button, useState, Select, Form } from "@forge/ui";

// Variables golables

let issuetypeName;
let issueTypeSchemeId;
let issueTypeId;
let workflowId;
let workflowName;



const App = () => {
  var options  = [
    {value :'1', label :'Project 1'},
    {value :'2', label :'Project 2'},
    {value :'3', label :'Project 3'},    
    {value :'4', label :'Project 4'},
  ];
  const [selectedProject, setSelectedProject] = useState(options[0]);

    return (
      <Fragment>
        <Button
          text="Click To Install NC Project"
          onClick={async () => {
            // creation de l'issue de l'issue type
            await createIssueType("Issue Type NC");
            // creation de l'issue type scheme
            await createIssueTypeScheme("Kanban Issue type Scheme NC");
            // créaction du workflow
            await createWorkflow("Workflow NC");
            // créaction du workflow scheme
            await createWorkflowScheme("Workflow Scheme NC");
          }}
        />
       <Form>
        <Select
          options={options}
          value= {selectedProject} 
          onChange={(option) => setSelectedProject(option)}
          name="Select project"
        />
    </Form>
      </Fragment>
    );
};

 // ISSUE TYPE FUNCTIONS 

async function createIssueType(name) {
  var body = JSON.stringify({
      name,
      description: "From FORGE",
      type: "standard"
  });

  const response = await api.asUser().requestJira(route`/rest/api/3/issuetype`, {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body
  });

  const json = await response.json();
  issueTypeId = json.id;
  issuetypeName = json.name;
  
  console.log("issue type created = ", issueTypeId)


  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log("Issue Type created successfully");
}
  async function createIssueTypeScheme(name) {

    var bodyData = {
      defaultIssueTypeId: issueTypeId,
      issueTypeIds: [issueTypeId],
      name: name,
      description: "From Forge.",
    };
    
    const response = await api
      .asUser()
      .requestJira(route`/rest/api/3/issuetypescheme`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
    
    
      console.log(`Response: ${response.status} ${response.statusText}`);
    console.log("Issue Type Scheme created succefully");
    
    await response.json().then((result) => {
      issueTypeSchemeId = result;
    });

  }
  // WORKFLOW FUNCTIONS 
  async function createWorkflow(name){
    
    var bodyData = JSON.stringify(
      {
      "name": name,
      "description": "Workflow NON CONFORMITE",
      "statuses": [
        {
          "id": "1",
          "properties": {
            "jira.issue.editable": "false"
          }
        }
      ],
      "transitions": [
        {
          "name": "Created",
          "from": [],
          "to": "1",
          "type": "initial"
        }
      ]
    }
    );
    
    const response = await api.asUser().requestJira(route`/rest/api/3/workflow`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: bodyData
    });
    const json = await response.json();
    workflowName = json.name;
    workflowId = json.entityId;

    
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log("Workflow created succefully")
  }
    

  async function createWorkflowScheme(name){
    
    var bodyData = JSON.stringify(
      {
      defaultWorkflow: workflowName,
      name: name ,
      description: "The description of the NC workflow scheme ",
      issueTypeMappings: {
        [issueTypeId] : workflowName,
      }
    }
    );
    const response = await api.asUser().requestJira(route`/rest/api/3/workflowscheme`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: bodyData
    });

    
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log("Workflow Scheme created succefully")
  }
 
export const run = render(
    <AdminPage>
        <App />
    </AdminPage>
);
