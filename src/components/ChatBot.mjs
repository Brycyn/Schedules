import OpenAI from "openai";
import React, { useState } from "react";
import { NavBar } from "./NavBar.jsx";
import { IoPaperPlaneOutline } from "react-icons/io5";


export default function Bot() {
  const [systemContent, setSystemContent] = useState()
  const [userContent, setUserContent] = useState()
  const [aIResponse, setAIResponse] = useState()



  async function fetchAIResponse() {

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
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
  return (<><div><NavBar /></div><div>

    <p>{aIResponse}</p>
    <div className="bot-bar" style={{ display: "flex", flexDirection: 'row' }}>
      <textarea style={{ width: '100%' }} type="textarea" onChange={async (e) => await setUserContent(e.target.value)}></textarea>
      <IoPaperPlaneOutline onClick={() => fetchAIResponse()} />
    </div>
  </div></>)
}

