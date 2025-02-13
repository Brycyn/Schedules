from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate

template = """ 

Answer the question below

Here is the conversation History: {context}

Question:{question}

Answer:


"""


model = OllamaLLM(model="llama3.2")

model.invoke(input="hello world")


result = model.invoke(input="hello world")

print(result)