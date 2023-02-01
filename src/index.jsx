import api, { route } from "@forge/api";
import ForgeUI, { render, AdminPage, Fragment, Text, Button } from "@forge/ui";
let Onglet = [];
let Page = {
  "issuetype": 0 ,

}



const App = () => {
    return (
        <Fragment>      
            
            <Button text="Click To Install NC Project" onClick={async () => 
              {
              // creation de l'issue de l'issue type 
              await issuetype("Issue Type NC");
              // creation de l'issue type scheme 
              await createissuetypescheme("Kanban Issue Type Scheme NC");
              // ajout de l'issue type dans le issue type scheme 
              // await addIssuetypeToscheme(issueTypeSchemeId);
              // // 
              // await screentab("Identification et Enregistrement");
              // await screentab("Cause identifiées");
              // await screentab("Risques Analysés");
              // await screentab("Traitement");
              // await screentab("Validation");
              // // await getscreens();
              // await getalltabs();

              // await createfield("Cause(s) identifiée(s)","com.atlassian.jira.plugin.system.customfieldtypes:textarea");
              // await createfield("Pôle de competence","com.atlassian.jira.plugin.system.customfieldtypes:select");
              // await createfield("Responsable Analyse","com.atlassian.jira.plugin.system.customfieldtypes:userpicker");
              // await createfield("Risque","com.atlassian.jira.plugin.system.customfieldtypes:textarea");
              // await createfield("Besoin CAPA","com.atlassian.jira.plugin.system.customfieldtypes:select");
              // await createfield("Action (s) réalisée(s) hors CAPA / Justification","com.atlassian.jira.plugin.system.customfieldtypes:textarea");
              // await createfield("Responsable validation chef de pôle","com.atlassian.jira.plugin.system.customfieldtypes:userpicker");
              // await createfield("Responsable validation QA","com.atlassian.jira.plugin.system.customfieldtypes:userpicker");
              // await createfield("ADN_Categorie_NC","com.atlassian.jira.plugin.system.customfieldtypes:select");

              // await getfields();
              // // // // Identification et Enregistrement
              // await addFieldToScreenTab(1,Onglet[0],"Résumé");
              // await addFieldToScreenTab(1,Onglet[0],"Description");
              // await addFieldToScreenTab(1,Onglet[0],"Responsable");
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
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log(response.json);
    
}


async function issuetype(name) {
    var bodyData = `{
        "name": "${name}",
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
    console.log("Issue Type")
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log(await response.json());  
    console.log("/////////////////////////");

  }
  async function createissuetypescheme(name) {
    var bodyData = `{
      "defaultIssueTypeId": "10000",
      "issueTypeIds": [
      "10000"
    ],
    "name": "${name}",
    "description": "From Forge."
}`;

    const response = await api
      .asUser()
      .requestJira(route`/rest/api/3/issuetypescheme`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: bodyData,
      });
    console.log("Issue Type Scheme");
    console.log(`Response: ${response.status} ${response.statusText}`);
    Page.issueTypeSchemeId.push(await response.json());
    console.log(Page);
    console.log("/////////////////////////");
    
  }
  async function addIssuetypeToscheme(issueTypeSchemeId){
    var bodyData = `{
      "issueTypeIds": [
        "10000"
      ]
    }`;
    
    const response = await api.asUser().requestJira(route`/rest/api/3/issuetypescheme/${issueTypeSchemeId}/issuetype`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: bodyData
    });
    
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log(await response.json());
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
  
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log(await response.json());
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
    console.log(Onglet);
  }

  async function createfield(name, type, options){
  
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

  

export const run = render(
    <AdminPage>
        <App />
    </AdminPage>
);
