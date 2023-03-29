import api, { requestConfluence, route } from "@forge/api";
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
import { forEach } from "core-js/core/array";
// Variables golables
const ISSUETYPE_CAPA = "Issue Type CAPA";
const ISSUETYPE_NC = "Issue Type NC";
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
let IssueTypeScreenSchemeID;
let workflowSchemeID;
let install;
let CapaOrNC;
let issueTypeIdCAPA;
let issueTypeIdNC;
let ScreenSchemeidNC;
let ScreenSchemeidCAPA;
let screens;
let projectId;

const App = () => {
  const [options, setOptions] = useState([]);
  useEffect(async () => {
    await getAllProject().then((data) => {
      setOptions(data);
    });
  }, []);

  return (
    <Fragment>
      <Form
        submitButtonText="Click To Install"
        onSubmit={async (formData) => {
          project = formData.project;
          install = formData.Install;
          console.log(project);

          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // CapaOrNC = "CAPA";
            // ///////////////////////////////////////////////////////////////////////CAPA/////////////////////////////////////
            //   console.log("creation de l'issue type")
              // await createIssueType("Issue Type CAPA");
            //   // creation de l'issue type scheme
            //   console.log("Creation de l'issue type scheme")
            //   await createIssueTypeSchemeCAPANC("Kanban Issue type Scheme CAPA/NC", "Issue Type CAPA", "Issue Type NC");
            //   await AssignIssueTypeSchemeToProject(project, "Kanban Issue type Scheme CAPA/NC");
            //   // creation des fields
            //   console.log("Creation des fields")
            //   await CreateCustomField(
            //     "JeSuisLeTest",
            //     "com.atlassian.jira.plugin.system.customfieldtypes:select",
            //     "ADN_NC CAPA Domaines Impactés",
            //     ["Production", "Qualité", "Sécurité", "Environnement", "Autre"]
            //   );
              // await CreateCustomField(
              //   "CAPA Domaines Impactés",
              //   "com.atlassian.jira.plugin.system.customfieldtypes:select",
              //   "ADN_NC CAPA Domaines Impactés",
              //   ["Production", "Qualité", "Sécurité", "Environnement", "Autre"]
              // );
              // await CreateCustomField(
              //   "CAPA Source",
              //   "com.atlassian.jira.plugin.system.customfieldtypes:select",
              //   "ADN_NC CAPA Source"
              //   ["Client", "Fournisseur", "Interne", "Autre"]
              // );
              // await CreateCustomField(
              //   "CAPA date de fin prévue",
              //   "com.atlassian.jira.plugin.system.customfieldtypes:daterange",
              //   "ADN_NC CAPA date de fin prévue"
              // );
              // await CreateCustomField(
              //   "CAPA Responsable",
              //   "com.atlassian.jira.plugin.system.customfieldtypes:userpicker",
              //   "ADN_NC CAPA Responsable"
              // );
              // await CreateCustomField(
              //   "CAPA Analyse des causes",
              //   "com.atlassian.jira.plugin.system.customfieldtypes:textarea",
              //   "ADN_NC CAPA Analyse des causes"
              // );
              // await CreateCustomField(
              //   "CAPA plan d'action",
              //   "com.atlassian.jira.plugin.system.customfieldtypes:select",
              //   "ADN_NC CAPA plan d'action"
              // );
              // await CreateCustomField(
              //   "Description du plan d'action",
              //   "com.atlassian.jira.plugin.system.customfieldtypes:textarea",
              //   "ADN_NC Description du plan d'action"
              // );
            //   console.log("Creation des screens")
            //   // Creation des screens
            //   await getallscreenscheme();
            //   //await getallissuetype();
            //   await createScreen("CAPA Screen");
            //   console.log("Creation des screens scheme")
            //   await createScreenScheme("CAPA Screen Scheme");
            //   console.log("Creation des issue type screen scheme")
            //   await CreateIssueTypeScreenSchemeCAPANC("NC/CAPA issue type screen scheme");
            //   console.log("Creation des onglets")
            //   await screentab("Création");
            //   await screentab("Traitement");
            //   await getalltabs("CAPA Screen");
            //   await getfieldsCAPA();
            //   //Creation des onglets  // CREATION  // TRAITEMENT
            //   console.log("Creation des onglets")
            //   await addFieldToScreenTab(screenid, Onglet[1], "summary");
            //   await addFieldToScreenTab(screenid, Onglet[1], "description");
            //   await addFieldToScreenTab(screenid, Onglet[1], "assignee");



            // // créaction du workflow

            // await createWorkflow("Workflow CAPA");

            // // créaction du workflow scheme
            // await createWorkflowScheme("Workflow Scheme CAPA");
            // try {
            //   await AssignIssueTypeScreenToProject(project, "NC/CAPA issue type screen scheme");
            //   //await AssignWorkflowSchemeToProject(project,"Workflow Scheme CAPA");
            // } catch (error) {
            //   console.log(error);
            // }
            ///////////////////////////////////////////////////////////////////////NC/////////////////////////////////////
            // issuetypeName = undefined;
            // issueTypeSchemeId = undefined;
            // issueTypeId = undefined;
            // workflowId = undefined;
            // workflowName = undefined;
            // Onglet = [];
            // screenid = 0;
            // IssueType = undefined;
            // ScreenScheme = undefined;
            // ScreenSchemeid = 0;
            // ScreenSchemeidDefault = 0;
            // IssueTypeScreenSchemeID = undefined;
            // workflowSchemeID = undefined;
            // install = undefined;
            // CapaOrNC = "NC";
            // try {
            //   await createIssueType("Issue Type NC");
            //   // creation de l'issue type scheme
            //   await createIssueTypeSchemeCAPANC("Kanban Issue type Scheme CAPA/NC", "Issue Type CAPA", "Issue Type NC");
            //   await AssignIssueTypeSchemeToProject(project, "Kanban Issue type Scheme CAPA/NC");
            //   //creation des fields
            //   await CreateCustomField(
            //     "Cause(s) identifiée(s)",
            //     "com.atlassian.jira.plugin.system.customfieldtypes:textarea",
            //     "ADN_NC Cause(s) identifiée(s)"
            //   );
            //   await CreateCustomField(
            //     "Pôle de competence",
            //     "com.atlassian.jira.plugin.system.customfieldtypes:select",
            //     "ADN_NC Pôle de competence",
            //     ["Qualité", "Agilité","Sérialisation", "Ingénierie système"]
            //   );
            //   await CreateCustomField(
            //     "Responsable Analyse",
            //     "com.atlassian.jira.plugin.system.customfieldtypes:userpicker",
            //     "ADN_NC Responsable Analyse"
            //   );
            //   await CreateCustomField(
            //     "Risque",
            //     "com.atlassian.jira.plugin.system.customfieldtypes:textarea",
            //     "ADN_NC Risque"
            //   );
            //   await CreateCustomField(
            //     "Besoin CAPA",
            //     "com.atlassian.jira.plugin.system.customfieldtypes:select",
            //     "ADN_NC Besoin CAPA",
            //     ["Oui", "Non"]
            //   );
            //   await CreateCustomField(
            //     "Action (s) réalisée(s) hors CAPA / Justification",
            //     "com.atlassian.jira.plugin.system.customfieldtypes:textarea",
            //     "ADN_NC Action (s) réalisée(s) hors CAPA / Justification"
            //   );
            //   await CreateCustomField(
            //     "Responsable validation chef de pôle",
            //     "com.atlassian.jira.plugin.system.customfieldtypes:userpicker",
            //     "ADN_NC Responsable validation chef de pôle"
            //   );
            //   await CreateCustomField(
            //     "Responsable validation QA",
            //     "com.atlassian.jira.plugin.system.customfieldtypes:userpicker",
            //     "ADN_NC Responsable validation QA"
            //   );
            //   await CreateCustomField(
            //     "Categorie_NC",
            //     "com.atlassian.jira.plugin.system.customfieldtypes:select",
            //     "ADN_NC Categorie_NC",
            //     ["Services", "Produit", "SMQ"]
            //   );
            //   //Creation des screens
            //   await getallscreenscheme();
            //   await getallissuetype();
            //   await createScreen("NC Project");
            //   await createScreenScheme("NC Project Scheme");
            //   await CreateIssueTypeScreenSchemeCAPANC("NC/CAPA issue type screen scheme");
            //   await screentab("Identification et Enregistrement");
            //   await screentab("Cause identifiées");
            //   await screentab("Risques Analysés");
            //   await screentab("Traitement");
            //   await screentab("Validation");
            //   await getalltabs("NC Project");
            //   await getfieldsNC();
            //   await addFieldToScreenTab(screenid, Onglet[1], "summary");
            //   await addFieldToScreenTab(screenid, Onglet[1], "description");
            //   await addFieldToScreenTab(screenid, Onglet[1], "assignee");
            //   await addFieldToScreenTab(screenid, Onglet[4], "attachment");
            //   await addFieldToScreenTab(screenid, Onglet[4], "issuelinks");
            // }
            // catch (e) {
            //   console.log(e);
            // }
            // // créaction du workflow
            // await createWorkflow("Workflow NC");
            // // créaction du workflow scheme
            // await createWorkflowScheme("Workflow Scheme NC");
            // try {
            //   await AssignIssueTypeScreenToProject(project, "NC/CAPA issue type screen scheme");
            // }
            // catch (e) {
            //   console.log("AssignIssueTypeScreenToProject", e);
            // }
            // try {
            //   await AssignWorkflowSchemeToProject(project, "Workflow Scheme NC");
            // }
            // catch (e) {
            //   console.log("AssignWorkflowSchemeToProject", e);
            // }
          }
        }
      >
      <Button text="issue type" onClick={async () => {
        console.log("create");
        await createIssueType("Issue Type NC");
              // creation de l'issue type scheme
              await createIssueTypeSchemeCAPANC("Kanban Issue type Scheme CAPA/NC", "Issue Type CAPA", "Issue Type NC");
              await AssignIssueTypeSchemeToProject(project, "Kanban Issue type Scheme CAPA/NC");
      }} />
      <Button text="fields" onClick={async () => {
        await CreateCustomField(
                "Description",
                "com.atlassian.jira.plugin.system.customfieldtypes:textarea",
                "ADN_NC Description"
        );
        await CreateCustomField(
                "Catégorie de NC",
                "com.atlassian.jira.plugin.system.customfieldtypes:select",
                "ADN_Catégorie de NC",
                ["Services", "Produit", "SMQ"]

        );
        await CreateCustomField(
                "Description",
                "com.atlassian.jira.plugin.system.customfieldtypes:textarea",
                "ADN_NC Description"
        );
        await CreateCustomField(
                "Data",
                "com.atlassian.jira.plugin.system.customfieldtypes:textfield",
                "ADN_NC Data"
        );
        await CreateCustomField(
                "date et heure",
                "com.atlassian.jira.plugin.system.customfieldtypes:datetime",
                "ADN_NC date et heure"
        );
        await CreateCustomField(
                "Type du DM",
                "com.atlassian.jira.plugin.system.customfieldtypes:select",
                "ADN_NC Type du DM",
                ["sonde", "respirateur", "prothese"]
        );
        await CreateCustomField(
                "Marque",
                "com.atlassian.jira.plugin.system.customfieldtypes:select",
                "ADN_NC Marque",
                ["philips", "Mindray", "Chison", "toshiba"]
        );
        await CreateCustomField(
                "Marque",
                "com.atlassian.jira.plugin.system.customfieldtypes:select",
                "ADN_NC Marque",
                ["philips", "Mindray", "Chison", "toshiba"]
        );
        await CreateCustomField(
                "Référence du produit",
                "com.atlassian.jira.plugin.system.customfieldtypes:textarea",
                "ADN_NC Référence du produit",
        );
        await CreateCustomField(
                "Désignation",
                "com.atlassian.jira.plugin.system.customfieldtypes:textarea",
                "ADN_NC Désignation",
        );
        await CreateCustomField(
                "Numéro de lot",
                "com.atlassian.jira.plugin.system.customfieldtypes:textarea",
                "ADN_NC Numéro de lot",
        );
        await CreateCustomField(
                "Date de fabrication",
                "com.atlassian.jira.plugin.system.customfieldtypes:datetime",
                "ADN_NC Date de fabrication"
        );
        await CreateCustomField(
                "Quantité non conforme",
                "com.atlassian.jira.plugin.system.customfieldtypes:number",
                "ADN_NC Quantité non conforme"
        );
        //champ a choix multiple
        await CreateCustomField(
                "Type de non conformité",
                "com.atlassian.jira.plugin.system.customfieldtypes:multiselect",
                "ADN_NC Type de non conformité",
                ["performance", "service", "qualité"]
        );
      }} />
      <Button text="assign field screen" onClick={async () => {
        await getfieldsNC();
      }} />
      <Button text="Custom Field" onClick={async () => {
         await CreateCustomField(
                "Cause(s) identifiée(s)",
                "com.atlassian.jira.plugin.system.customfieldtypes:textarea",
                "ADN_NC Cause(s) identifiée(s)"
              );
              await CreateCustomField(
                "Pôle de competence",
                "com.atlassian.jira.plugin.system.customfieldtypes:select",
                "ADN_NC Pôle de competence",
                ["Qualité", "Agilité","Sérialisation", "Ingénierie système"]
              );
              await CreateCustomField(
                "Responsable Analyse",
                "com.atlassian.jira.plugin.system.customfieldtypes:userpicker",
                "ADN_NC Responsable Analyse"
              );
              await CreateCustomField(
                "Risque",
                "com.atlassian.jira.plugin.system.customfieldtypes:textarea",
                "ADN_NC Risque"
              );
              await CreateCustomField(
                "Besoin CAPA",
                "com.atlassian.jira.plugin.system.customfieldtypes:select",
                "ADN_NC Besoin CAPA",
                ["Oui", "Non"]
              );
              await CreateCustomField(
                "Action (s) réalisée(s) hors CAPA / Justification",
                "com.atlassian.jira.plugin.system.customfieldtypes:textarea",
                "ADN_NC Action (s) réalisée(s) hors CAPA / Justification"
              );
              await CreateCustomField(
                "Responsable validation chef de pôle",
                "com.atlassian.jira.plugin.system.customfieldtypes:userpicker",
                "ADN_NC Responsable validation chef de pôle"
              );
              await CreateCustomField(
                "Responsable validation QA",
                "com.atlassian.jira.plugin.system.customfieldtypes:userpicker",
                "ADN_NC Responsable validation QA"
              );
              await CreateCustomField(
                "Categorie_NC",
                "com.atlassian.jira.plugin.system.customfieldtypes:select",
                "ADN_NC Categorie_NC",
                ["Services", "Produit", "SMQ"]
              );
        console.log("create");
      }} />
      <Button text="screen" onClick={async () => {
        console.log("create");
        console.log("1");
        await getallscreenscheme();
        console.log("2");
              await getallissuetype();
              console.log("3");
              await createScreen("NC Project");
              console.log("4");
              await createScreenScheme("NC Project Scheme");
              console.log("5");
              await CreateIssueTypeScreenSchemeCAPANC("NC/CAPA issue type screen scheme");
              console.log("6");
              await screentab("Généralités");
              console.log("7");
              await screentab("Cause identifiées");
              console.log("8");
              await screentab("Risques Analysés");
              console.log("9");
              await screentab("Traitement");
              console.log("10");
              await screentab("Validation");
              console.log("11");
              
      }} />
      <Button text="scheme" onClick={async () => {  
        console.log("create");
        await getalltabs("NC Project");
              console.log("12");
              await getfieldsNC();
              console.log("13");
              await addFieldToScreenTab(screenid, Onglet[1], "summary");
              console.log("14");
              await addFieldToScreenTab(screenid, Onglet[1], "description");
              console.log("15");
              await addFieldToScreenTab(screenid, Onglet[1], "assignee");
              console.log("16");
              console.log("17");
              console.log("18");
      }} />

      <Button text="workflow" onClick={async () => {
        console.log("create");
         // créaction du workflow
         await createWorkflow("Workflow NC");
            // créaction du workflow scheme
            await createWorkflowScheme("Workflow Scheme NC");
            await AssignWorkflowSchemeToProject(project, "Workflow Scheme NC");
      }} />
      <Button text="asssign" onClick={async () => {
        console.log("create");
        await AssignIssueTypeScreenToProject(project, "NC/CAPA issue type screen scheme");
      }} />

        <Select label="Select Project" name="project">
          {options.map((option) => (
            <Option value={option.id} label={option.name} />
          ))}
        </Select>
      </Form>
    <Text  style={{ padding: '10px', fontSize: '20px' }}>Delete NC & CAPA</Text>
      <Button
        text="Delete Project"
        onClick={async () => {
          console.log("delete");
          ////////////////////////////////////////////DELETE///////////////////////////////////////////
          try {
            await deleteCustomField("CAPA Domaines Impactés");
            await deleteCustomField("CAPA Source");
            await deleteCustomField("CAPA date de fin prévue");
            await deleteCustomField("CAPA Responsable");
            await deleteCustomField("CAPA Analyse des causes");
            await deleteCustomField("CAPA plan d'action");
            await deleteCustomField("Description du plan d'action");
            await deleteCustomField("Cause(s) identifiée(s)");
            await deleteCustomField("Pôle de competence");
            await deleteCustomField("Responsable Analyse");
            await deleteCustomField("Risque");
            await deleteCustomField("Besoin CAPA");
            await deleteCustomField("Action (s) réalisée(s) hors CAPA / Justification");
            await deleteCustomField("Responsable validation chef de pôle");
            await deleteCustomField("Responsable validation QA");
            await deleteCustomField("Categorie_NC");
          } catch (error) {
            console.log(error);
          }
          try {
            await deleteIssueTypeScheme("Kanban Issue type Scheme CAPA/NC");
            await deleteIssueTypeScheme("Kanban Issue type Scheme CAPA");
            await deleteIssueTypeScheme("Kanban Issue type Scheme NC");
          } catch (error) {
            console.log(error);
          }
          try {
            await getAllProject();
          } catch (error) {
            console.log(error);
          }
          try {
            await unassignIssueTypeShemetoProject();
          } catch (error) {
            console.log(error);
          }
          await deleteIssue();
          try {
            await deleteIssueType("Issue Type CAPA");
            await deleteIssueType("Issue Type NC");
          } catch (error) {
            console.log(error);
          }
          try {
            await deleteIssueTypeScreenScheme("NC/CAPA issue type screen scheme");
            await deleteIssueTypeScreenScheme("CAPA issue type screen scheme");
            await deleteIssueTypeScreenScheme("NC issue type screen scheme");
          } catch (error) {
            console.log(error);
          }
          try {
            await deleteScreenScheme();
          } catch (error) {
            console.log(error);
          }
          try {
            await deleteScreen();
          } catch (error) {
            console.log(error);
          }

        }}
      />
    </Fragment>
  );
};

// ISSUE TYPE FUNCTIONS

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
  if (response.status === 409) {
    console.log(`Issue type already exists`);
  }
  else {
    console.log(`isssue created with id ${issueTypeId} and name ${issuetypeName} `);
  }

}
async function createIssueTypeScheme(name, issue) {
  //regarde si issuetypeId est bien défini sinon erreur
  if (issueTypeId === undefined) {
    //requete pour récupérer l'issuetypeId et recuperer l'id avec le nom Issue Type NC
    const response = await api
      .asUser()
      .requestJira(route`/rest/api/3/issuetype`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    await response.json().then((result) => {
      result.forEach((element) => {
        if (element.name === issue) {
          issueTypeId = element.id;
        }
      });
    }
    );
  }
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
  if (response.status === 409 || response.status === 400) {
    console.log(`Issue type scheme already exists `);
  }
  else {
    console.log(`Issue type scheme created`);
  }

  await response.json().then((result) => {
    issueTypeSchemeId = result;
  });
}
async function getallissuetype() {
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/issuetype`, {
      headers: {
        Accept: "application/json",
      },
    });
  //donner a la variable IssueType la reponse
  IssueType = await response.json();
  if (response.status >= 400) {
    console.log(`issue type not found`);
  }
  console.log(`issue type found`);
}
// WORKFLOW FUNCTIONS
async function createWorkflow(name) {

  var bodyData = JSON.stringify({
    "name": name,
    "statuses": [{
      "id": "1",
      "properties": {
        "jira.issue.editable": "false"
      }
    },
    {
      "id": "3"
    },
    {
      "id": "4"

    },
    {
      "id": "5"

    },
    {
      "id": "6"
    }
    ],
    "transitions": [{
      "name": "Analyse QA",
      "to": "1",
      "type": "initial"
    },
    {
      "from": [
        "1"
      ],
      "name": "NC AQ",

      "to": "3",
      "type": "directed"
    },
    {
      "from": [
        "3"
      ],
      "name": "HORS CAPA",

      "to": "4",
      "type": "directed"
    },
    {
      "from": [
        "3"
      ],
      "name": "CAPA VAL",

      "to": "5",
      "type": "directed"
    },
    {
      "from": [
        "4",
        "5"
      ],
      "name": "NON CAPA VAL",

      "to": "6",
      "type": "directed"
    }
    ]
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
  if (response.status >= 400) {
    console.log(`Workflow already exists`);
  }
  else {
    console.log(`Workflow created with id ${workflowId} and name ${workflowName} `);
  }
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
  if (response.status >= 400) {
    console.log(`Workflow scheme already exists`);
  }
  else {
    console.log(`Workflow scheme created`);
  }
  workflowSchemeID = await response.json();
}

async function createIssueTypeSchemeCAPANC(name, issueCAPA, NC) {
  //regarde si issuetypeId est bien défini sinon erreur issueTypeIdCAPA issueTypeIdNC
  if (issueTypeIdCAPA === undefined) {
    //requete pour récupérer l'issuetypeId et recuperer l'id avec le nom Issue Type NC
    const response = await api
      .asUser()
      .requestJira(route`/rest/api/3/issuetype`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    await response.json().then((result) => {
      result.forEach((element) => {
        if (element.name === issueCAPA) {
          issueTypeIdCAPA = element.id;
        }
      });
    }
    );
  }
  if (issueTypeIdNC === undefined) {
    //requete pour récupérer l'issuetypeId et recuperer l'id avec le nom Issue Type NC
    const response = await api
      .asUser()
      .requestJira(route`/rest/api/3/issuetype`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    await response.json().then((result) => {
      result.forEach((element) => {
        if (element.name === NC) {
          issueTypeIdNC = element.id;
        }
      });
    }
    );
  }
  var bodyData = {
    defaultIssueTypeId: issueTypeIdCAPA,
    issueTypeIds: [issueTypeIdCAPA, issueTypeIdNC],
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
  if (response.status >= 400) {
    console.log(`Issue type scheme already exists`);
  }
  else {
    console.log(`Issue type scheme created`);
  }

  await response.json().then((result) => {
    issueTypeSchemeId = result;
  });
}

async function AssignWorkflowSchemeToProject(project, name) {
  // Check if workflowSchemeID is undefined and if so, retrieve the workflowScheme and assign the id of the "Workflow Scheme NC" workflow to workflowSchemeID
  const response_first = await api
    .asUser()
    .requestJira(route`/rest/api/3/workflowscheme`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  const result = await response_first.json();
  for (const element of result.values) {
    if (element.name === name) {
      workflowSchemeID = { id: element.id };
    }
  }
  var bodyData = JSON.stringify({
    workflowScheme: workflowSchemeID,
    projectId: project,
  });
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/workflowscheme/project`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
  if (response.status >= 400) {
    console.log(`Workflow scheme already assigned to project`);
  }
  else {
    console.log(`Workflow scheme assigned to project`);
  }
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
  if (response.status >= 400) {
    console.log(`Screen already exists`);
  }
  else {
    console.log(`Screen created`);
  }

}
async function createScreen(name) {
  if (screenid === undefined || screenid === 0) {
    getallscreen(name);
  } else {
    const screen = screens.find(s => s.name === name);
    if (screen) {
      screenid = screen.id;
    } else {
      console.error(`Screen with name "${name}" not found`);
    }
  }
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
  if (response.status >= 400) {
    console.log(`Screen already exists`);
  }
  else {
    console.log(`Screen created`);
  }

}

async function createScreenScheme(name) {
  if (ScreenSchemeid === undefined) {
    letscreenscheme = await getallscreenscheme();
    for (const element of screenscheme.values) {
      if (element.name === name) {
        ScreenSchemeid = element.id;
      }
    }
  }
  var bodyData = {
    screens: {
      default: screenid,
    },
    name: name,
    description: "From FORGE",
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
  if (response.status >= 400) {
    console.log(`Screen scheme already exists`);
  }
  else {
    console.log(`Screen scheme created`);
  }
}
async function getallscreen() {
  const response = await api.asUser().requestJira(route`/rest/api/3/screens`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.status >= 400) {
    console.log(`Screen already exists`);
  }
  else {
    console.log(`Screen created`);
    console.log(response.json());
  }
  screens = await response.json();
  return screens;
}




async function CreateIssueTypeScreenSchemeCAPANC(name) {
  //met dans une variable l'issue type Issue Type NC
  let issuetypeNameNC = "Issue Type NC";
  let ScreenSchemeNameNC = "NC Project Scheme";
  await getallscreenscheme();
  for (const screen_scheme of ScreenScheme.values) {
    if (screen_scheme.name === ScreenSchemeNameNC) {
      ScreenSchemeidNC = screen_scheme.id;
    }
  }
  let issuetypeNameCAPA = "Issue Type CAPA";
  let ScreenSchemeNameCAPA = "CAPA Screen Scheme";
  await getallscreenscheme();
  for (const screen_scheme of ScreenScheme.values) {
    if (screen_scheme.name === ScreenSchemeNameCAPA) {
      ScreenSchemeidCAPA = screen_scheme.id;
    }
  }
  await getallissuetype();
  for (const issue_type of IssueType) {
    if (issuetypeNameCAPA === issue_type.name) {
      issueTypeIdCAPA = issue_type.id;
    }
    if (issuetypeNameNC === issue_type.name) {
      issueTypeIdNC = issue_type.id;
    }
  }

  //pareil pour le screen scheme
  var bodyData = {
    name: name,
    issueTypeMappings: [
      {
        issueTypeId: "default",
        screenSchemeId: ScreenSchemeidDefault,
      },
      {
        issueTypeId: issueTypeIdCAPA,
        screenSchemeId: ScreenSchemeidCAPA,
      },
      {
        issueTypeId: issueTypeIdNC,
        screenSchemeId: ScreenSchemeidNC,
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
  if (response.status >= 400) {
    console.log(`Screen scheme already exists`);
  }
  else {
    console.log(`Screen scheme created`);
  }
  IssueTypeScreenSchemeID = await response.json();
}











async function CreateIssueTypeScreenScheme(name) {
  //met dans une variable l'issue type Issue Type NC
  if (CapaOrNC === "NC") {
    issuetypeName = "Issue Type NC";
    let ScreenSchemeName = "NC Project Scheme";
    await getallscreenscheme();
    for (const screen_scheme of ScreenScheme.values) {
      if (screen_scheme.name === ScreenSchemeName) {
        ScreenSchemeid = screen_scheme.id;
      }
    }
  } else if (CapaOrNC === "CAPA") {
    issuetypeName = "Issue Type CAPA";
    let ScreenSchemeName = "CAPA Screen Scheme";
    await getallscreenscheme();
    for (const screen_scheme of ScreenScheme.values) {
      if (screen_scheme.name === ScreenSchemeName) {
        ScreenSchemeid = screen_scheme.id;
      }
    }
  }
  await getallissuetype();
  for (const issue_type of IssueType) {
    if (issuetypeName === issue_type.name) {
      issueTypeId = issue_type.id;
    }
  }

  //pareil pour le screen scheme
  var bodyData = {
    name: name,
    issueTypeMappings: [
      {
        issueTypeId: "default",
        screenSchemeId: ScreenSchemeidDefault,
      },
      {
        issueTypeId: issueTypeId,
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
  console.log(`Response CreateIssueTypeScreenScheme `);
  IssueTypeScreenSchemeID = await response.json();
}
async function getallscreenscheme() {
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/screenscheme`, {
      headers: {
        Accept: "application/json",
      },
    });
  //donner a la variable ScreenScheme la reponse
  ScreenScheme = await response.json();
  ScreenSchemeidDefault = ScreenScheme.values[0].id;
  console.log(`Response getallscreenscheme `);
}
async function getalltabs(name) {
  if (!screenid) {
    screens = await getallscreen();
    console.log(`screens ` + screens);
    const screen = screens.values.find((screen) => screen.name === name);
    screenid = screen ? screen.id : null;
  }
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
  console.log(`Response getalltabs `);
}

async function AssignIssueTypeScreenToProject(project, IssuetypeScreenScheme) {
  console.log(project);
  if (project == 0 ){
    project = 10003;
  }
  if (IssuetypeScreenScheme.id == undefined) {
    const response = await api
      .asUser()
      .requestJira(route`/rest/api/2/issuetypescreenscheme`, {
        headers: {
          Accept: "application/json",
        },
      });
    IssueTypeScreenSchemeID = await response.json();
    console.log(response.json());
    for (const issuetypescreenscheme of IssueTypeScreenSchemeID.values) {
      if (issuetypescreenscheme.name == IssuetypeScreenScheme) {
        IssueTypeScreenSchemeID.id = issuetypescreenscheme.id;

      }
    }
  }
  var bodyData = JSON.stringify({
    issueTypeScreenSchemeId: IssueTypeScreenSchemeID.id,
    projectId: project,
  });
  console.log(bodyData);
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/issuetypescreenscheme/project`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
  console.log(`Response AssignIssueTypeScreenToProject `);
  console.log(response);
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ FIELDS FUNCTIONS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
async function getfieldsNC() {
  const response = await api.asUser().requestJira(route`/rest/api/2/field`, {
    headers: {
      Accept: "application/json",
    },
  });
  const array_json = await response.json();
  // Ajouter chaque elements de array_json dans un tableau json
  for (const result of array_json) {
    if(result.name == "Cause(s) identifiée(s)"){
        await addFieldToScreenTab(screenid, Onglet[2], result.id);
      }
    if(result.name == "Pôle de competence"){
        await addFieldToScreenTab(screenid, Onglet[2], result.id);
      }
    if(result.name == "Responsable Analyse"){
        await addFieldToScreenTab(screenid, Onglet[2], result.id);
      }
    if(result.name == "Risque"){
        await addFieldToScreenTab(screenid, Onglet[3], result.id);
      }
    if(result.name == "Besoin CAPA"){
        await addFieldToScreenTab(screenid, Onglet[3], result.id);
      }
    if(result.name == "Action (s) réalisée(s) hors CAPA / Justification"){
        await addFieldToScreenTab(screenid, Onglet[4], result.id);
      }
    if(result.name == "Responsable validation chef de pôle"){
        await addFieldToScreenTab(screenid, Onglet[5], result.id);
      }
    if(result.name == "Responsable validation QA"){
        await addFieldToScreenTab(screenid, Onglet[5], result.id);
      }
    if(result.name == "Categorie_NC"){
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      }
    if(result.name == "Data"){
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      }
    if(result.name == "Date et heure"){
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      }
    if(result.name == "Type du DM"){
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      }
    if(result.name == "Marque"){
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      }
    if(result.name == "Référence du produit"){
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      }
    if(result.name == "Désignation"){
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      }
    if(result.name == "Numéro de lot"){
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      }
    if(result.name == "Date de fabrication"){
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      }
    if(result.name == "Quantité non conforme"){
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      }
    if(result.name == "Type de NC"){
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      }
    if(result.name == "Le responsable qualité"){
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
    }
  }
  console.log(`Response getfieldsNC `);
}
async function getfieldsCAPA() {
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
      case "CAPA Domaines Impactés":
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      case "CAPA Source":
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      case "CAPA date de fin prévue":
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      case "CAPA Responsable":
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      case "CAPA Analyse des causes":
        await addFieldToScreenTab(screenid, Onglet[1], result.id);
      case "CAPA plan d'action":
        await addFieldToScreenTab(screenid, Onglet[2], result.id);
      case "Description du plan d'action":
        await addFieldToScreenTab(screenid, Onglet[2], result.id);
    }
  }
  console.log(`Response getfieldsCAPA `);
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
  if (response.status >= 400) {
    console.log(`already added`);
  }
  else {
    console.log(`Response addFieldToScreenTab `);
  }
}

async function CreateCustomField(name, type, description, options) {
  // Chercher les champs existants
  const Check = await api.asUser().requestJira(route`/rest/api/2/field`, {
    headers: {
      Accept: "application/json",
    },
  });
  // Parcourir les champs existants pour voir si le champ existe déjà
  const array_json = await Check.json();
  if (array_json.find((array) => array.name == name) == undefined) {
    // Préparer le corps de la requête en fonction des options fournies
    let bodyData = {
      name: name,
      description: description,
      type: type
    };

    
    console.log(`bodyData`, bodyData);

    const response = await api.asUser().requestJira(route`/rest/api/2/field`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    if (options && options.length > 0) {
      console.log(response.json());
      let fieldId = (await response.json()).id;
      console.log(`fieldId`, fieldId);
      const context = await api.asUser().requestJira(route`/rest/api/2/field/${fieldId}/contexts`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let contextId = (await context.json()).values[0].id;
      let body = {
        "options": [
        ]
      }
      for (const option of options) {
        body.options.push({
          "value": option
        })
      }
      console.log(`body`, body);
      const option = await api.asUser().requestJira(route`/rest/api/2/field/${fieldId}/context/${contextId}/option`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    }
    console.log(`Response CreateCustomField`, response, response.status);
    //afficher les infos de la reponse
    console.log(`Response CreateCustomField`, await response.json());

  }
}



async function getAllProject() {
  const response = await api.asUser().requestJira(route`/rest/api/2/project`, {
    headers: {
      Accept: "application/json",
    },
  });
  //fill le select avec les projets
  if (response.status >= 400) {
    console.log(`Error getAllProject `);
  }
  else {
    console.log(`Response getAllProject `);
    //renvoyer la reponse la data
    return await response.json();
  }
}
async function AssignIssueTypeSchemeToProject(project, name) {
  if (issueTypeSchemeId.id == undefined) {
    const response = await api
      .asUser()
      .requestJira(route`/rest/api/2/issuetypescheme`, {
        headers: {
          Accept: "application/json",
        },
      });
    issueTypeSchemeId = await response.json();
    for (const issuetypescheme of issueTypeSchemeId.values) {
      if (issuetypescheme.name == name) {
        issueTypeSchemeId.id = issuetypescheme.id;

      }
    }

  }
  var bodyData = JSON.stringify({
    issueTypeSchemeId: issueTypeSchemeId.id,
    projectId: project,
  });
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/2/issuetypescheme/project`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
  if (response.status == 200) {
    console.log(`Response AssignIssueTypeSchemeToProject `);
  }
  else {
    console.log(`Response already assigned `);
  }
}
async function deleteCustomField(name) {
  //recuperer les field existant 
  const response = await api.asUser().requestJira(route`/rest/api/2/field/search?type=custom`, {
    headers: {
      Accept: "application/json",
    },
  });
  //parcourir les field existant pour voir si le field existe deja et si il existe le supprimer
  const array_json = await response.json();
  for (const result of array_json.values) {
    //regarde aussi si la description contient "ADN_NC"
    if (result.name == name && result.description.includes('ADN_NC')) {
      const response = await api.asUser().requestJira(route`/rest/api/2/field/${result.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      if (response.status >= 400) {
        console.log(`Response deleteCustomField failed `);
      }
      else {
        console.log(`Response deleteCustomField `);
      }
    }
    else {
    }
  }
}
async function deleteIssueTypeScheme(name) {
  //recuperer les issuetypescheme existant
  const response = await api.asUser().requestJira(route`/rest/api/2/issuetypescheme`, {
    headers: {
      Accept: "application/json",
    },
  });
  //parcourir les issuetypescheme existant pour voir si le issuetypescheme existe deja et si il existe le supprimer
  const array_json = await response.json();
  for (const result of array_json.values) {
    if (result.name == name) {
      const response = await api.asUser().requestJira(route`/rest/api/2/issuetypescheme/${result.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      if (response.status >= 400) {
        console.log(`Response deleteIssueTypeScheme failed `);
      }
      else {
        console.log(`Response deleteIssueTypeScheme `);
      }
    }
  }
}
//delete issue type
async function deleteIssueType(name) {
  //recuperer les issuetypes existant
  const response = await api.asUser().requestJira(route`/rest/api/2/issuetype`, {
    headers: {
      Accept: "application/json",
    },
  });
  //parcourir les issuetypes existant pour voir si le issuetypes existe deja et si il existe le supprimer
  const array_json = await response.json();
  for (const result of array_json) {
    if (result.name == name) {
      const response = await api.asUser().requestJira(route`/rest/api/2/issuetype/${result.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      if (response.status >= 400) {
        console.log(`Response deleteIssueType failed `);
      }
      else {
        console.log(`Response deleteIssueType `);
      }
    }
  }
}
async function deleteIssueTypeScreenScheme(name) {
  //recuperer les issuetypescreenscheme existant
  const response = await api.asUser().requestJira(route`/rest/api/2/issuetypescreenscheme`, {
    headers: {
      Accept: "application/json",
    },
  });
  //parcourir les issuetypescreenscheme existant pour voir si le issuetypescreenscheme existe deja et si il existe le supprimer
  const array_json = await response.json();
  for (const result of array_json.values) {
    if (result.name == name) {
      const response = await api.asUser().requestJira(route`/rest/api/2/issuetypescreenscheme/${result.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      if (response.status >= 400) {
        console.log(`Response deleteIssueTypeScreenScheme failed `);
      }
      else {
        console.log(`Response deleteIssueTypeScreenScheme `);
      }
    }
  }
}
async function DeleteAssignIssueTypeScreenToProject() {
  //recuperer les issuetypescreenscheme existant
  const response = await api.asUser().requestJira(route`/rest/api/2/issuetypescreenscheme/project`, {
    headers: {
      Accept: "application/json",
    },
  });
  //parcourir les issuetypescreenscheme existant et si il a le nom Kanban Issue type Scheme CAPA/NC le supprimer
  const array_json = await response.json();
  for (const result of array_json.values) {
    if (result.issueTypeScreenScheme.name == "Kanban Issue type Scheme CAPA/NC" || result.issueTypeScreenScheme.name == "Kanban Issue type Scheme CAPA" || result.issueTypeScreenScheme.name == "Kanban Issue type Scheme NC") {
      const response = await api.asUser().requestJira(route`/rest/api/2/issuetypescreenscheme/project/${result.projectId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      if (response.status >= 400) {
        console.log(`Response DeleteAssignIssueTypeScreenToProject failed `);
      }
      else {
        console.log(`Response DeleteAssignIssueTypeScreenToProject `);
      }
    }
  }
}
async function deleteScreen() {
  //recuperer les screen existant
  const response = await api.asUser().requestJira(route`/rest/api/2/screens`, {
    headers: {
      Accept: "application/json",
    },
  });
  //parcourir les screen existant pour voir si le screen a comme nom CAPA Screen ou NC Project et si il existe le supprimer
  const array_json = await response.json();

  for (const result of array_json.values) {
    if (result.name == "CAPA Screen" || result.name == "NC Project") {
      const response = await api.asUser().requestJira(route`/rest/api/2/screens/${result.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      if (response.status >= 400) {
        console.log(`Response deleteScreen failed `);
      }
      else {
        console.log(`Response deleteScreen `);
      }
    }
  }
}
async function deleteScreenScheme() {
  //recuperer les screenscheme existant
  const response = await api.asUser().requestJira(route`/rest/api/2/screenscheme`, {
    headers: {
      Accept: "application/json",
    },
  });
  //parcourir les screenscheme existant et si il a le nom NC Project Scheme ou CAPA Screen Scheme le supprimer
  const array_json = await response.json();
  for (const result of array_json.values) {
    if (result.name == "NC Project Scheme" || result.name == "CAPA Screen Scheme") {
      const response = await api.asUser().requestJira(route`/rest/api/2/screenscheme/${result.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      if (response.status >= 400) {
        console.log(`Response deleteScreenScheme failed `);
      }
      else {
        console.log(`Response deleteScreenScheme `);
      }
    }
  }
}
async function unassignIssueTypeShemetoProject() {
  ///recupere tous les projects
  let pID =[]
  const response2 = await api.asUser().requestJira(route`/rest/api/2/project`, {
    headers: {
      Accept: "application/json",
    },
  });
  //afficher tous les projects
  const array_json2 = await response2.json();
  for (const result of array_json2) {
    pID.push(result.id);
  }
  try{
  for(let i=0;i<pID.length;i++){
    const response5 = await api.asUser().requestJira(route`/rest/api/2/issuetypescreenscheme/project?projectId=${pID[i]}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    const array_json5 = await response5.json();
    if(array_json5.values[0].issueTypeScreenScheme != undefined){
    if(array_json5.values[0].issueTypeScreenScheme.name == "NC/CAPA issue type screen scheme"){
      var bodyData = `{
        "issueTypeScreenSchemeId": "10001",
        "projectId": "${array_json5.values[0].projectIds[0]}"
      }`;
      
      const response = await api.asUser().requestJira(route`/rest/api/2/issuetypescreenscheme/project`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: bodyData
      });

    }
  }
}
  }catch(e){
  }


  //recuperer les issuetypescreenscheme existant
  const response = await api.asUser().requestJira(route`/rest/api/2/issuetypescreenscheme`, {
    headers: {
      Accept: "application/json",
    },
  });
  //parcourir les issuetypescreenscheme existant et si il a le nom NC/CAPA issue type screen scheme le supprimer
  const array_json = await response.json(); 
  for (const result of array_json.values) {
    if (result.name == "NC/CAPA issue type screen scheme") {
      const response = await api.asUser().requestJira(route`/rest/api/2/issuetypescreenscheme/${result.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      if (response.status >= 400) {
        console.log(`Response unassignIssueTypeShemetoProject failed `);
      }
      else {
        console.log(`Response unassignIssueTypeShemetoProject `);
      }
    }
  }
}
async function deleteIssue(){
  console.log("deleteIssue");
  //recuperer tous les projects
  const response2 = await api.asUser().requestJira(route`/rest/api/2/project`, {
    headers: {
      Accept: "application/json",
    },
  });
  //parcours tous les projects et recuperer les key
  const array_json2 = await response2.json();
  let pID =[]
  for (const result of array_json2) {
    pID.push(result.key);
  }
  console.log(pID);
  //parcourir les key des projects
  for(let i=0;i<pID.length;i++){
    //pour chaque project recuperer les issues du project
    const response = await api.asUser().requestJira(route`/rest/api/2/search?jql=project=${pID[i]}`, {
      headers: {
        Accept: "application/json",
      },
    });
    const array_json = await response.json();
    //parcourir les issues du project
    try{
    for (const result of array_json.issues) {
      console.log(result.fields.issuetype.name);
      console.log(result.id);
      //si l'issue a le nom NC ou CAPA la supprimer
      if (result.fields.issuetype.name == "Issue Type CAPA" || result.fields.issuetype.name == "Issue Type NC") {
        const response = await api.asUser().requestJira(route`/rest/api/2/issue/${result.id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        });
        if (response.status >= 400) {
          console.log(response.status + " " + response.statusText)
          console.log(`Response deleteIssue failed `);
        }
        else {
          console.log(`Response deleteIssue `);
        }
      }
    }
  }catch(e){
    console.log(e);
  }
}
}

export const run = render(
  <AdminPage>
    <App />
  </AdminPage>
);
