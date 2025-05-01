import { useState, useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function KalikaChatbot() {
  type Message = {
    text: string;
    isUser: boolean;
  };

  const genAI = new GoogleGenerativeAI(
    "AIzaSyBaUKIYRqv4Bj2V-Kqx1C7IJ5zvlRwLO_E"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        text: "Hello! Welcome to Kalika Manavgyan Secondary School. How can I assist you today?",
        isUser: false,
      },
    ]);
  }, []);

  // Modified scroll behavior to only scroll the chat area
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  }, [messages]);

  const generateResponse = async (userInput: string): Promise<string> => {
    const prompt = `
    You are a chatbot for Kalika Manavgyan Secondary School. Respond in a natural, friendly way without any special characters or repeated letters. Use the following details to answer questions:

    - Location: Butwal Sub-metropolitan City, Ward No. 10, Kalikanagar (Sector-1) and Ramnagar (Sector-2), Rupandehi, Lumbini Province.
    - History: Established in 1961 A.D (2018 B.S) by local residents, many of whom were ex-army personnel. Initially started as a primary school, upgraded to lower secondary in 2029 B.S, and became a secondary school in 2032 B.S.
    - Streams Offered: General education (ECD to grade 12) and Technical education (Computer Engineering from grades 9 to 12).
    - Faculties: Science, Computer Engineering, Management, Education, Humanities, and Law.
    - Facilities: Free hostel for orphaned and underprivileged students, special facilities for national-level athletes, holistic development programs.
    - Achievements: 
      * 8,087 students (highest among community schools in Nepal).
      * 252 teaching staff and 45 non-teaching staff.
      * Full scholarships for around 30 MBBS and Engineering students annually.
      * Consistently ranked as the top school in Nepal with a score of 93.5 (CEHRD).
      * Awarded five National Flags since 2071 B.S.
      * "A Grade School" with ISA Certificate from the British Council.
    - Unique Offering: Educational opportunities for underprivileged students and a destination for educational tourism.

    -Some importants details and contributors in Kalika Manavgyan Secondary School:
    - Principal: Dinesh Thapa
    - Vice Principal: Pitambar Banjade
    - Computer Engineering Incharge: "Arbind Dubey" He is a dedicated contributor at Kalika Manavgyan Secondary School, who has been instrumental in the development of the Computer Engineering program. He is known for his commitment to providing quality education and fostering a positive learning environment for students.
    Remember to keep responses natural and concise. Avoid repeating characters.

    User: ${userInput}
    Chatbot: `;

    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Error generating response:", error);
      return "I apologize, but I'm having trouble generating a response at the moment. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await generateResponse(input);
      const botMessage = { text: response, isUser: false };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      const errorMessage = {
        text: "I'm sorry, I couldn't process your request. Please try again.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="chat"
      className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl mx-auto border border-gray-200"
    >
      <div className="flex flex-col h-[700px]">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex items-center">
          <Avatar className="h-16 w-16 mr-4 border-4 border-white shadow-lg">
            <AvatarImage src="/school-logo.png" alt="Kalika Chatbot" />
            <AvatarFallback>KC</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-3xl font-bold">Kalika School Assistant</h2>
            <p className="text-lg opacity-90">
              Your guide to Kalika Manavgyan Secondary School
            </p>
          </div>
        </div>

        <ScrollArea className="flex-grow p-6 bg-gray-50" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!message.isUser && (
                  <Avatar className="h-10 w-10 mr-3 mt-1 flex-shrink-0">
                    <AvatarImage src="/school-logo.png" alt="Kalika Chatbot" />
                    <AvatarFallback>KC</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl shadow-md ${
                    message.isUser
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <p className="text-lg leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </p>
                </div>
                {message.isUser && (
                  <Avatar className="h-10 w-10 ml-3 mt-1 flex-shrink-0">
                    <AvatarImage src="/user-avatar.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-gray-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex space-x-4"
          >
            <Input
              type="text"
              placeholder="Ask about Kalika Manavgyan Secondary School..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow text-lg py-6 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <Send className="h-6 w-6 mr-2" />
                  Send
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
