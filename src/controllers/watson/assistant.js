const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: process.env.ASSISTANT_APIKEY,
  }),
  url: process.env.ASSISTANT_URL,
});

// Create and return session
async function createAssistantSession(assistant_id){
  assistant.createSession({
    assistantId: assistant_id
  })
  .then(res => {
    return (JSON.parse(JSON.stringify(res.result, null, 2)).session_id);
  })
  .catch(err => {
    return (err);
  });
}

// Delete assistant session 
async function deleteAssistantSession(assistant_id, session_id){
  assistant.deleteSession({
    assistantId: assistant_id,
    sessionId: session_id,
  })
  .then(res => {
  return (JSON.stringify(res.result, null, 2));
  })
  .catch(err => {
  return (err);
  });
}

// Send message to assistant
async function sendAssistantMessage(assistant_id, session_id, text){

  assistant.message({
    assistantId: assistant_id,
    sessionId: session_id,
    input: {
    'message_type': 'text',
    'text': text
    }
  })
  .then(res => {
    return (JSON.stringify(res.result, null, 2));
  })
  .catch(err => {
    return (err);
  });
}

async function getAssistantId(to){
  // Get instance by name or id bot
  return 'f3bc1e15-dc9e-44e3-9875-aa9fada36da4';
}

async function getSession(conversationId){
  // Get sessionAssistance by conversationId
  return 'fa81c965-8a33-4863-a9eb-dab78f4088e2';
}

exports.messageToAssistant = async (conversationId, to, text) => {
  try {
    var assistant_id = await getAssistantId(to);
    var session = await getSession(conversationId);
    if(!session){
      session = await createAssistantSession(assistant_id);
    }
    return sendAssistantMessage(assistant_id, session, text).then(response => {console.log(response)});
  } catch (e) {
    return e;
  }
};