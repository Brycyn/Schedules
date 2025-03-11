import OpenAI from "openai";
import React, { useState } from "react";
import { NavBar } from "./NavBar.jsx";
import { IoPaperPlaneOutline } from "react-icons/io5";


export default function Bot() {
  const [systemContent, setSystemContent] = useState()
  const [userContent, setUserContent] = useState('')
  const [aIResponse, setAIResponse] = useState(null)



  async function fetchAIResponse() {

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true
    });



    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: userContent,
        },
      ],
      store: true,
    });
    setAIResponse(completion.choices[0].message.content)
    console.log(completion.choices[0].message);
  }
  return (
    <div>
      <NavBar />

      <div className="bot-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ color: "wheat" }}>{aIResponse || "How can I assist you today?"} </p>
          <div className="bot-bar" style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black', width: '100%', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
            <textarea style={{ width: '70%', backgroundColor: 'grey', color: "white", marginRight: '10px', borderRadius: 70, padding: 5, fontSize: 20 }} type="textarea" onChange={async (e) => await setUserContent(e.target.value)} />
            <IoPaperPlaneOutline size={25} style={{ color: "white" }} onClick={() => fetchAIResponse()} />
          </div>
        </div>
      </div >
    </div>
  )
}

