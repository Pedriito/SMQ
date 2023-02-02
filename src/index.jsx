import api, { route } from "@forge/api";
import ForgeUI, { render, AdminPage, Fragment, Text, Button } from "@forge/ui";
let Onglet = [];
let screenid = 0;
let IssueType;
let ScreenScheme;
let ScreenSchemeid = 0;
let ScreenSchemeidDefault = 0;

const App = () => {
    return (
        <Fragment>      
            
            <Button text="Click To Install NC Project" onClick={async () => 
              {
                
              await getallscreenscheme();
              await issuetype();
              getallissuetype();
              await createScreen("NC Project");
              console.log(screenid);
              console.log(screenid);
              console.log(screenid);
              console.log(screenid);
              console.log(screenid);
              console.log(screenid);
              console.log(screenid);
              console.log(screenid);
              await createScreenScheme("NC Project Scheme");
              CreateIssueTypeScreenScheme("NC Project Scheme");
              await screentab("Identification et Enregistrement");
              await screentab("Cause identifiées");
              await screentab("Risques Analysés");
              await screentab("Traitement");
              await screentab("Validation");
              await getalltabs();
              await CreateCustomField("Cause(s) identifiée(s)","com.atlassian.jira.plugin.system.customfieldtypes:textarea");
              await CreateCustomField("Pôle de competence","com.atlassian.jira.plugin.system.customfieldtypes:select");
              await CreateCustomField("Responsable Analyse","com.atlassian.jira.plugin.system.customfieldtypes:userpicker");
              await CreateCustomField("Risque","com.atlassian.jira.plugin.system.customfieldtypes:textarea");
              await CreateCustomField("Besoin CAPA","com.atlassian.jira.plugin.system.customfieldtypes:select");
              await CreateCustomField("Action (s) réalisée(s) hors CAPA / Justification","com.atlassian.jira.plugin.system.customfieldtypes:textarea");
              await CreateCustomField("Responsable validation chef de pôle","com.atlassian.jira.plugin.system.customfieldtypes:userpicker");
              await CreateCustomField("Responsable validation QA","com.atlassian.jira.plugin.system.customfieldtypes:userpicker");
              await CreateCustomField("ADN_Categorie_NC","com.atlassian.jira.plugin.system.customfieldtypes:select");

              await getfields();
              // // // Identification et Enregistrement
              await addFieldToScreenTab(1,Onglet[0],"Résumé");
              await addFieldToScreenTab(1,Onglet[0],"Description");
              await addFieldToScreenTab(1,Onglet[0],"Responsable");
              // await addFieldToScreenTab(1,Onglet[0],"ADN_Categorie_NC");
              // // // Cause identifiées
              // await addFieldToScreenTab(1,10031,"Cause(s) identifiée(s)");
              // await addFieldToScreenTab(1,10031,"Pôle de competence");
              // await addFieldToScreenTab(1,10031,"Responsable Analyse");
                
              // // // Risques Analysés
              // await addFieldToScreenTab(1,Onglet[2],"Risque");
              // await addFieldToScreenTab(1,Onglet[2], "Besoin CAPA");
                
              // // // Traitement
              // await addFieldToScreenTab(1,Onglet[3],"Action (s) réalisée(s) hors CAPA / Justification");
              await addFieldToScreenTab(1,Onglet[3], "Pièce jointe");
              await addFieldToScreenTab(1,Onglet[3], "Tickets liés");

              // // // Validation
              // await addFieldToScreenTab(1,Onglet[3]),"Responsable validation chef de pôle";
              // await addFieldToScreenTab(1,Onglet[3],"Responsable validation QA");
              
            }
              }/>
              <Button text =" Bouton TEST " onClick={
                async () => {

              }
              }/>
        </Fragment>
    );
};
async function addfields(){

}
async function getfields(){
  const response = await api.asUser().requestJira(route`/rest/api/2/field`, {
    headers: {
      "Accept": "application/json"
    }
  });
  // ////console.log(`Response: ${response.status} ${response.statusText}`);
  // //console.log(await response.json());
    const array_json = await response.json();
   // Ajouter chaque elements de array_json dans un tableau json
    const json = [];
    for (const result of array_json) {
      json.push(result.id);
      switch (result.name){
        case "Cause(s) identifiée(s)" : await addFieldToScreenTab(1,Onglet[1],result.id);
        case "Pôle de competence": await addFieldToScreenTab(1,Onglet[1],result.id);
        case "Responsable Analyse": await addFieldToScreenTab(1,Onglet[1],result.id);
        case "Risque": await addFieldToScreenTab(1,Onglet[2],result.id);
        case "Besoin CAPA": await addFieldToScreenTab(1,Onglet[2], result.id);
        case "Action (s) réalisée(s) hors CAPA / Justification":await addFieldToScreenTab(1,Onglet[3],result.id);
        case "Responsable validation chef de pôle": await addFieldToScreenTab(1,Onglet[3],result.id);
        case "Responsable validation QA": await addFieldToScreenTab(1,Onglet[3],result.id);
        case "ADN_Categorie_NC": await addFieldToScreenTab(1,Onglet[0],result.id);
      }
    }
    //console.log(`Response: ${response.status} ${response.statusText}`);
    //console.log(response.json);
    
}


async function issuetype() {
    var bodyData = `{
        "name": "Issue Type NC",
        "description": "From FORGE ",
        "type": "standard"
      }`; 
      
      const response = await api.asUser().requestJira(route`/rest/api/3/issuetype`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: bodyData
      });
      //donner a issuetype la reponse
      issuetype = await response.json();
    //console.log("Issue Type")
    //console.log(`Response: ${response.status} ${response.statusText}`);
    //console.log(await response.json());  

  }
  

  async function screentab (name){
    var bodyData = `{
      "name": "${name}"
    }`;
    
    const response = await api.asUser().requestJira(route`/rest/api/3/screens/1/tabs`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: bodyData
    });
    
    //console.log(`Response: ${response.status} ${response.statusText}`);
    //console.log(await response.json());  

  }
  
  async function addFieldToScreenTab(screenId, tabId, fieldId) {
  
    var bodyData = `{
      "fieldId": "${fieldId}"
    }`;
  
    const response = await api.asUser().requestJira(route`/rest/api/3/screens/${screenId}/tabs/${tabId}/fields`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: bodyData
    });
  
    //console.log(`Response: ${response.status} ${response.statusText}`);
    //console.log(await response.json());
  }
  
  async function getalltabs (){
    const response = await api.asUser().requestJira(route`/rest/api/3/screens/1/tabs`, {
      headers: {
        "Accept": "application/json"
      }
    });
    
    //console.log(`Response: ${response.status} ${response.statusText}`);
    //console.log(await response.json());
    const onglet_id = await response.json();
    for (const onglet of onglet_id){
      Onglet.push(onglet.id);
    }
    //console.log(Onglet);
  }

  async function CreateCustomField(name, type, options){
    //chercher les field existant
    const Check = await api.asUser().requestJira(route`/rest/api/2/field`, {
      headers: {
        "Accept": "application/json"
      }
    });
    //parcourir les field existant pour voir si le field existe deja
    const array_json = await Check.json();
    for (const result of array_json) {
      if (result.name == name){
        //console.log("Le field existe deja");
        return;
      }
    }
    //si le field n'existe pas on le cree
    ////
    // if(type == "com.atlassian.jira.plugin.system.customfieldtypes:select"){
    //   var bodyData = {
    //     "name": name,
    //     "description": type,
    //     "type": type,
    //     "options": [
    //       {
    //         "disable" : false,
    //         "value" : 1,
    //       },
    //       {
    //         "disable" : false,
    //         "value" : 2,
    //       },
    //       {
    //         "disable" : false,
    //         "value" : 3,
    //       },
    //     ]
    //   };
    // }

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
    async function createScreen(name){
      var bodyData = `{
        "name": "${name}",
        "description": "Created from Forge"
      }`;
      
      const response = await api.asUser().requestJira(route`/rest/api/2/screens`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: bodyData
      });
      const screen = await response.json();
      screenid = screen.id;
      // //mettre dans screenid l'id du screen cree
      // console.log(`eh je suis le screen avec l'id ${screenid}`);
      // console.log(await response.json());
    }
async function createScreenScheme(name) {
  await getallscreen();

  var bodyData = {
    "screens": {
      "default": screenid,
    },
    "name": "NC test screen scheme",
    "description": "Manage employee data"
  };
  //convertir le body en json
  bodyData = JSON.stringify(bodyData);

  const response = await api.asUser().requestJira(route`/rest/api/2/screenscheme`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  });
  ScreenScheme = await response.json();
  ScreenSchemeid = ScreenScheme.id;
//   console.log(`eh je suis le screen scheme avec l'id ${screenid}`);
// console.log(`ezjahdjhdqjhdqjhjdsqhgjdqGDKQGDQHJKQGFFFFFFFQFGHSQGFHSDJGFDSQHJKFGSDQFHJGQSJFHBSDQHFBSDHCBHJEQBHEZHYBCCHSBCHJbhcjsbqkcqhbscqeuzbyucBCSDHBKBCSQHUBSQUEYBESQCHBSQCDKHBDCSHK`);
// console.log(`Response: ${response.status} ${response.statusText}`);
// console.log(await response.json());
    }
    async function getallscreen(){
      const response = await api.asUser().requestJira(route`/rest/api/2/screens`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      //parsours la reponse pour recuperer les id des screens
      //console.log(`Response: ${response.status} ${response.statusText}`);
      //console.log(await response.json());
    }
    async function CreateIssueTypeScreenScheme(name){
      console.log("je suis dans la fonction");

      //met dans une variable l'issue type Issue Type NC
      var issue_type = 0;
      for (const issuetype of IssueType){
        if (issuetype.name == "Issue Type NC"){
          issue_type = issuetype.id;   
        }
      }
      console.log(issue_type);
      console.log(ScreenSchemeid);
      //pareil pour le screen scheme
      var bodyData = {
        "name": "NC issue type screen scheme",
        "issueTypeMappings": [
          {
            "issueTypeId": "default",
            "screenSchemeId": ScreenSchemeidDefault
          }
        ]
    };
    bodyData = JSON.stringify(bodyData);
    const response = await api.asUser().requestJira(route`/rest/api/2/issuetypescreenscheme`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: bodyData
    });
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log(await response.json());
  }
    async function getallscreenscheme(){
      console.log("je suis dans la fonction2");
      const response = await api.asUser().requestJira(route`/rest/api/2/screenscheme`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      //donner a la variable ScreenScheme la reponse
      ScreenScheme = await response.json();
      console.log(ScreenScheme);
      ScreenSchemeidDefault = ScreenScheme.values[0].id;
      console.log(`Response: ${response.status} ${response.statusText}`);
    }
    async function getallissuetype(){
      console.log("je suis dans la fonction3");
      const response = await api.asUser().requestJira(route`/rest/api/2/issuetype`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      //donner a la variable IssueType la reponse
      IssueType = await response.json();
      console.log(`Response: ${response.status} ${response.statusText}`);
    }

export const run = render(
    <AdminPage>
        <App />
    </AdminPage>
);
