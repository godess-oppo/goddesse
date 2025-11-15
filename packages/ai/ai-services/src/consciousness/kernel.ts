import { OpenAI } from 'openai'

export class ConsciousnessKernel {
  private openai: OpenAI
  
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  }
  
  async generateProductDescription(product: any) {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are a fashion expert creating compelling product descriptions."
      }, {
        role: "user",
        content: `Describe this product: ${JSON.stringify(product)}`
      }]
    })
    return response.choices[0].message.content
  }
}
