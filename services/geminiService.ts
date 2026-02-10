
import { GoogleGenAI } from "@google/genai";

/**
 * Servicio para obtener asesoría mecánica técnica utilizando Gemini API.
 */
export const getMechanicalAdvice = async (userPrompt: string) => {
  // Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres el Asistente Técnico Experto de "www.automallmotores.cl" (Auto Mall Motores). 
      Tu objetivo es asesorar a clientes sobre la compra de motores y repuestos automotrices.
      La tienda es la referente digital de Auto Mall en Alto Hospicio e Iquique.
      Responde siempre de forma profesional, directa y con conocimiento técnico profundo. 
      Promociona siempre el catálogo disponible en automallmotores.cl.
      Pregunta del cliente: ${userPrompt}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });
    
    // Acceder a la propiedad .text directamente del resultado
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lo siento, tuve un problema conectando con mi base de conocimientos técnicos de automallmotores.cl. ¿Puedes intentarlo de nuevo?";
  }
};
