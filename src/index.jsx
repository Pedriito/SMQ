import api, { route } from "@forge/api";
import ForgeUI, {
  render,
  AdminPage,
  Button,
  Select,
  Fragment,
  Text,
  Form,
  Option,
  useState,
  useEffect,
} from "@forge/ui";


// Variables golables

let issuetypeName;
let issueTypeSchemeId;
let issueTypeId;
let workflowId;
let workflowName;
let Onglet = [];
let screenid = 0;
let IssueType;
let ScreenScheme;
let ScreenSchemeid = 0;
let ScreenSchemeidDefault = 0;
let project = 0;

const App = () => {
  //mettre dans option les projet avec la fonction getallproject
  const [options, setOptions] = useState([]);
  useEffect(async () => {
    console.log("useEffect");
    await getAllProject().then((data) => {
      setOptions(data);
    });
  }, []);

  return (
    <Fragment>
    <Form onSubmit={async (formData) => {
        console.log(formData);
        project = formData.project;
        console.log(project);
        main();
      }}>
          <Select label="Select Project" name="project">
            {options.map((option) => (
              <Option value={option.id} label={option.name} />
            ))}
          </Select>
      </Form>
      <Button
        text="Click To Install NC Project"
        onClick={async () => {
          // creation de l'issue de l'issue type
          await createIssueType("Issue Type NC");
          // creation de l'issue type scheme
          await createIssueTypeScheme("Kanban Issue type Scheme NC");
          // creation des fields
          await CreateCustomField(
            "Cause(s) identifiée(s)",
            "com.atlassian.jira.plugin.system.customfieldtypes:textarea"
          );
          await CreateCustomField(
            "Pôle de competence",
            "com.atlassian.jira.plugin.system.customfieldtypes:select"
          );
          await CreateCustomField(
            "Responsable Analyse",
            "com.atlassian.jira.plugin.system.customfieldtypes:userpicker"
          );
          await CreateCustomField(
            "Risque",
            "com.atlassian.jira.plugin.system.customfieldtypes:textarea"
          );
          await CreateCustomField(
            "Besoin CAPA",
            "com.atlassian.jira.plugin.system.customfieldtypes:select"
          );
          await CreateCustomField(
            "Action (s) réalisée(s) hors CAPA / Justification",
            "com.atlassian.jira.plugin.system.customfieldtypes:textarea"
          );
          await CreateCustomField(
            "Responsable validation chef de pôle",
            "com.atlassian.jira.plugin.system.customfieldtypes:userpicker"
          );
          await CreateCustomField(
            "Responsable validation QA",
            "com.atlassian.jira.plugin.system.customfieldtypes:userpicker"
          );
          await CreateCustomField(
            "ADN_Categorie_NC",
            "com.atlassian.jira.plugin.system.customfieldtypes:select"
          );
          // Creation des screens
          await getallscreenscheme();
          getallissuetype();
          await createScreen("NC Project");
          console.log(screenid);
          await createScreenScheme("NC Project Scheme");
          CreateIssueTypeScreenScheme("NC Project Scheme");
          await screentab("Identification et Enregistrement");
          await screentab("Cause identifiées");
          await screentab("Risques Analysés");
          await screentab("Traitement");
          await screentab("Validation");
          await getalltabs();
          await getfields();
          // // // Identification et Enregistrement
          await addFieldToScreenTab(screenid, Onglet[0], "Résumé");
          await addFieldToScreenTab(screenid, Onglet[0], "Description");
          await addFieldToScreenTab(screenid, Onglet[0], "Responsable");
          await addFieldToScreenTab(screenid, Onglet[3], "Pièce jointe");
          await addFieldToScreenTab(screenid, Onglet[3], "Tickets liés");
          // créaction du workflow
          await createWorkflow("Workflow NC");
          // créaction du workflow scheme
          await createWorkflowScheme("Workflow Scheme NC");
        }}
      />
    </Fragment>
  );
};

// ISSUE TYPE FUNCTIONS
async function main(){
  // creation de l'issue de l'issue type
  await createIssueType("Issue Type NC");
  // creation de l'issue type scheme
  await createIssueTypeScheme("Kanban Issue type Scheme NC");
  // creation des fields
  await CreateCustomField(
    "Cause(s) identifiée(s)",
    "com.atlassian.jira.plugin.system.customfieldtypes:textarea"
  );
  await CreateCustomField(
    "Pôle de competence",
    "com.atlassian.jira.plugin.system.customfieldtypes:select"
  );
  await CreateCustomField(
    "Responsable Analyse",
    "com.atlassian.jira.plugin.system.customfieldtypes:userpicker"
  );
  await CreateCustomField(
    "Risque",
    "com.atlassian.jira.plugin.system.customfieldtypes:textarea"
  );
  await CreateCustomField(
    "Besoin CAPA",
    "com.atlassian.jira.plugin.system.customfieldtypes:select"
  );
  await CreateCustomField(
    "Action (s) réalisée(s) hors CAPA / Justification",
    "com.atlassian.jira.plugin.system.customfieldtypes:textarea"
  );
  await CreateCustomField(
    "Responsable validation chef de pôle",
    "com.atlassian.jira.plugin.system.customfieldtypes:userpicker"
  );
  await CreateCustomField(
    "Responsable validation QA",
    "com.atlassian.jira.plugin.system.customfieldtypes:userpicker"
  );
  await CreateCustomField(
    "ADN_Categorie_NC",
    "com.atlassian.jira.plugin.system.customfieldtypes:select"
  );
  // Creation des screens
  await getallscreenscheme();
  getallissuetype();
  await createScreen("NC Project");
  console.log(screenid);
  await createScreenScheme("NC Project Scheme");
  CreateIssueTypeScreenScheme("NC Project Scheme");
  await screentab("Identification et Enregistrement");
  await screentab("Cause identifiées");
  await screentab("Risques Analysés");
  await screentab("Traitement");
  await screentab("Validation");
  await getalltabs();
  await getfields();
  // // // Identification et Enregistrement
  await addFieldToScreenTab(screenid, Onglet[0], "Résumé");
  await addFieldToScreenTab(screenid, Onglet[0], "Description");
  await addFieldToScreenTab(screenid, Onglet[0], "Responsable");
  await addFieldToScreenTab(screenid, Onglet[3], "Pièce jointe");
  await addFieldToScreenTab(screenid, Onglet[3], "Tickets liés");
  // créaction du workflow
  await createWorkflow("Workflow NC");
  // créaction du workflow scheme
  await createWorkflowScheme("Workflow Scheme NC");
}
async function createIssueType(name) {
  var body = JSON.stringify({
    name,
    description: "From FORGE",
    type: "standard",
  });

  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/issuetype`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });

  const json = await response.json();
  issueTypeId = json.id;
  issuetypeName = json.name;

  console.log("issue type created = ", issueTypeId);

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
async function getallissuetype() {
  console.log("je suis dans la fonction3");
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/2/issuetype`, {
      headers: {
        Accept: "application/json",
      },
    });
  //donner a la variable IssueType la reponse
  IssueType = await response.json();
  console.log(`Response: ${response.status} ${response.statusText}`);
}
// WORKFLOW FUNCTIONS
async function createWorkflow(name) {
  var bodyData = JSON.stringify({
    name: name,
    description: "Workflow NON CONFORMITE",
    statuses: [
      {
        id: "1",
        properties: {
          "jira.issue.editable": "false",
        },
      },
    ],
    transitions: [
      {
        name: "Created",
        from: [],
        to: "1",
        type: "initial",
      },
    ],
  });

  const response = await api.asUser().requestJira(route`/rest/api/3/workflow`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: bodyData,
  });
  const json = await response.json();
  workflowName = json.name;
  workflowId = json.entityId;

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log("Workflow created succefully");
}

async function createWorkflowScheme(name) {
  var bodyData = JSON.stringify({
    defaultWorkflow: workflowName,
    name: name,
    description: "The description of the NC workflow scheme ",
    issueTypeMappings: {
      [issueTypeId]: workflowName,
    },
  });
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/workflowscheme`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: bodyData,
    });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log("Workflow Scheme created succefully");
}

// SCREEN FUNCTIONS
async function screentab(name) {
  var bodyData = `{
    "name": "${name}"
  }`;

  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/screens/${screenid}/tabs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
}
async function createScreen(name) {
  var bodyData = `{
      "name": "${name}",
      "description": "Created from Forge"
    }`;

  const response = await api.asUser().requestJira(route`/rest/api/2/screens`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: bodyData,
  });
  const screen = await response.json();
  screenid = screen.id;
}
async function createScreenScheme(name) {
  await getallscreen();

  var bodyData = {
    screens: {
      default: screenid,
    },
    name: "NC test screen scheme",
    description: "Manage employee data",
  };
  //convertir le body en json
  bodyData = JSON.stringify(bodyData);

  const response = await api
    .asUser()
    .requestJira(route`/rest/api/2/screenscheme`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
  ScreenScheme = await response.json();
  ScreenSchemeid = ScreenScheme.id;
}
async function getallscreen() {
  const response = await api.asUser().requestJira(route`/rest/api/2/screens`, {
    headers: {
      Accept: "application/json",
    },
  });
}
async function CreateIssueTypeScreenScheme(name) {
  console.log("je suis dans la fonction");
  //met dans une variable l'issue type Issue Type NC
  var issue_type = 0;
  for (const issuetype of IssueType) {
    if (issuetype.name == "Issue Type NC") {
      issue_type = issuetype.id;
    }
  }
  console.log(issue_type);
  console.log(ScreenSchemeid);
  //pareil pour le screen scheme
  var bodyData = {
    name: "NC issue type screen scheme",
    issueTypeMappings: [
      {
        issueTypeId: "default",
        screenSchemeId: ScreenSchemeidDefault,
      },
      {
        issueTypeId: issue_type,
        screenSchemeId: ScreenSchemeid,
      },
    ],
  };
  bodyData = JSON.stringify(bodyData);
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/2/issuetypescreenscheme`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
}
async function getallscreenscheme() {
  console.log("je suis dans la fonction2");
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/2/screenscheme`, {
      headers: {
        Accept: "application/json",
      },
    });
  //donner a la variable ScreenScheme la reponse
  ScreenScheme = await response.json();
  console.log(ScreenScheme);
  ScreenSchemeidDefault = ScreenScheme.values[0].id;
  console.log(`Response: ${response.status} ${response.statusText}`);
}
async function getalltabs() {
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/screens/${screenid}/tabs`, {
      headers: {
        Accept: "application/json",
      },
    });


  const onglet_id = await response.json();
  for (const onglet of onglet_id) {
    Onglet.push(onglet.id);
  }
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ FIELDS FUNCTIONS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
async function getfields() {
  const response = await api.asUser().requestJira(route`/rest/api/2/field`, {
    headers: {
      Accept: "application/json",
    },
  });
  const array_json = await response.json();
  // Ajouter chaque elements de array_json dans un tableau json
  const json = [];
  for (const result of array_json) {
    json.push(result.id);
    switch (result.name) {
      case "Cause(s) identifiée(s)":
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      case "Pôle de competence":
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      case "Responsable Analyse":
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      case "Risque":
        await addFieldToScreenTab(screenid, Onglet[2], result.id);
      case "Besoin CAPA":
        await addFieldToScreenTab(screenid, Onglet[2], result.id);
      case "Action (s) réalisée(s) hors CAPA / Justification":
        await addFieldToScreenTab(screenid, Onglet[3], result.id);
      case "Responsable validation chef de pôle":
        await addFieldToScreenTab(screenid, Onglet[3], result.id);
      case "Responsable validation QA":
        await addFieldToScreenTab(screenid, Onglet[3], result.id);
      case "ADN_Categorie_NC":
        await addFieldToScreenTab(screenid, Onglet[0], result.id);
    }
  }
}
async function addFieldToScreenTab(screenId, tabId, fieldId) {
  var bodyData = `{
    "fieldId": "${fieldId}"
  }`;

  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/screens/${screenId}/tabs/${tabId}/fields`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
}
async function CreateCustomField(name, type, options) {
  //chercher les field existant
  const Check = await api.asUser().requestJira(route`/rest/api/2/field`, {
    headers: {
      Accept: "application/json",
    },
  });
  //parcourir les field existant pour voir si le field existe deja
  const array_json = await Check.json();
  for (const result of array_json) {
    if (result.name == name) {
      //console.log("Le field existe deja");
      return;
    }
  }
  var bodyData = `{
      "name": "${name}",
      "description": "${type}",
      "type": "${type}"
    },`;

  const response = await api.asUser().requestJira(route`/rest/api/2/field`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: bodyData,
  });
}
async function getAllProject() {
  const response = await api.asUser().requestJira(route`/rest/api/3/project`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  //fill le select avec les projets
  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
  //renvoyer la reponse la data 
  return await response.json();

}

export const run = render(
  <AdminPage>
    <App />
  </AdminPage>
);
