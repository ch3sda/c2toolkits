// server/api/ai/analyze.post.ts

export default defineEventHandler(async (event) => {
  const { featureData } = await readBody(event);

  const prompt = `
You are an experienced and the greatest penetration tester and security analyst.
Task: Analyze the following scan output and provide a structured security assessment.

RULES:
- Provide a clinical, objective analysis. No conversational filler.
- You MAY mention CVE IDs ONLY if you are reasonably confident they are historically associated with the detected service/version.
- All CVE references MUST be labeled as "Possible CVEs".
- Explicitly state that all CVEs require verification and are NOT confirmed.
- Do NOT fabricate CVE IDs.
- If you are unsure of a CVE, recommend appropriate tools to verify instead.
- Do NOT claim exploitation success.
- Using "*" for bullet points is mandatory.
- Provide industry-standard PoC scripts (Python/NSE) in Section 5 if a high-confidence vector is found.

FORMATTING CONSTRAINTS (CRITICAL):
- Use PLAIN TEXT ONLY. 
- DO NOT use Markdown headers (no # or ## or ###).
- DO NOT use bold text (no ** symbols).
- DO NOT use italics (no * or _ for emphasis).
- Use ALL CAPS for section headers instead.
- Ensure there is a blank line between sections.

OUTPUT FORMAT:
1. SUMMARY OF FINDINGS
2. IDENTIFIED SERVICES & RISK LEVEL
3. POSSIBLE CVES (REQUIRING VERIFICATION)
4. RECOMMENDED VERIFICATION TOOLS
5. STEP-BY-STEP PENTEST NEXT ACTIONS

Here is the ${featureData.tool} data to analyze:
${JSON.stringify(featureData.findings, null, 2)}
  `;

try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        model: "llama3.2:3b", // qwen2.5:7b-instruct, deepseek-r1:8b , llama3.2:3b
        prompt: prompt,
        stream: true,
      })
    });

    if (!response.body) {
      throw new Error('No response body from Ollama');
    }

    // This pipes the Ollama stream directly to your Vue frontend
    return sendStream(event, response.body);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ollama Connection Failed'
    });
  }
});