import { v4 as uuidv4 } from 'uuid';

export class LangflowClient {
  private baseURL: string;
  private applicationToken: string;

  constructor(baseURL: string, applicationToken: string) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint: string, body: any, headers: Record<string, string> = {}) {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
    headers["Content-Type"] = "application/json";
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      });

      const responseMessage = await response.json();
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
      }
      return responseMessage;
    } catch (error) {
      console.error('Request Error:', error);
      throw error;
    }
  }

  async analyzeQuery(query: string) {
    const flowId = 'a14c5155-1a03-471e-910c-6afcb278b560';
    const langflowId = 'eb97ae71-c3f3-4e02-8cd3-b69376c41aec';
    
    const tweaks = {
      "Agent-J1o1D": {},
      "ChatInput-04uj9": {},
      "ChatOutput-VW7De": {},
      "AstraDBToolComponent-WRc5W": {},
      "Prompt-jppNA": {}
    };

    try {
      const response = await this.post(
        `/lf/${langflowId}/api/v1/run/${flowId}?stream=false`,
        {
          input_value: query,
          input_type: 'chat',
          output_type: 'chat',
          tweaks: tweaks
        }
      );

      if (response && response.outputs) {
        const output = response.outputs[0].outputs[0].outputs.message;
        return output.message.text;
      }
      return "Sorry, I couldn't process your request.";
    } catch (error) {
      console.error('Analysis Error:', error);
      throw error;
    }
  }
}