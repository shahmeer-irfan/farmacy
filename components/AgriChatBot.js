import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaTag } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";

const AgriChatbot = ({ latitude, longitude, nasaData }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [locationInfo, setLocationInfo] = useState(null);
    const chatEndRef = useRef(null);
    const [currentTagIndex, setCurrentTagIndex] = useState(0);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        fetchLocationInfo();
    }, [latitude, longitude]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTagIndex((prevIndex) => (prevIndex + 1) % promptTags.length);
        }, 2000); // Change tag every 2 seconds

        return () => clearInterval(interval);
    }, []);

    const fetchLocationInfo = async () => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            setLocationInfo(data);
        } catch (error) {
            console.error('Error fetching location info:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const botResponse = await getBotResponse(userMessage.content);
            setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
        } catch (error) {
            console.error('Error getting bot response:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        }

        setIsLoading(false);
    };

    const getBotResponse = async (userMessage) => {
        const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
        const YOUR_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
        const YOUR_SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;

        const locationString = locationInfo ?
            `${locationInfo.address.city || locationInfo.address.town || locationInfo.address.village || 'Unknown City'}, ${locationInfo.address.country || 'Unknown Country'}` :
            'Unknown Location';

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "HTTP-Referer": YOUR_SITE_URL,
                    "X-Title": YOUR_SITE_NAME,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "meta-llama/llama-3.1-8b-instruct:free",
                    "messages": [
                        {
                            "role": "system",
                            "content": `You are an agricultural assistant who only talks about agriculture and crops. Answer concisely. The user's location is at coordinates ${latitude}°N, ${longitude}°E, which is in ${locationString}. Use this location information and the following NASA POWER API data to provide relevant agricultural advice: ${JSON.stringify(nasaData)}`
                        },
                        {
                            "role": "user",
                            "content": userMessage
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error("Error calling OpenRouter API:", error);
            return "I'm sorry, I encountered an error while processing your request. Please try again later.";
        }
    };

    const promptTags = [
        "Best crops for my area",
        "Soil health tips",
        "Weather impact on farming",
        "Pest control advice",
        "Sustainable farming practices",
        "Irrigation strategies",
        "Crop rotation benefits",
        "Solar radiation effects",
        "Temperature trends",
        "Precipitation patterns",
        "Wind speed impact",
        "Humidity management",
        "Frost risk assessment",
        "Growing degree days",
        "Climate change adaptation"
    ];

    return (
      <div className="bg-gray-800 rounded-lg p-2 sm:p-4 w-full h-full flex flex-col">

        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-gray-100">
          Agricultural Assistant
        </h2>
        <div className="flex-grow overflow-y-auto mb-2 sm:mb-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mb-2 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-1 sm:p-2 text-sm sm:text-base rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-100"
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </span>
            </motion.div>
          ))}
          {isLoading && (
            <div className="text-center">
              <FaRobot className="animate-spin inline-block text-gray-400" />
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="mb-2 flex justify-center h-10">
          <div className="hidden sm:flex space-x-2">
            <AnimatePresence>
              {promptTags
                .slice(currentTagIndex, currentTagIndex + 3)
                .map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <button
                      onClick={() => setInput(tag)}
                      className="bg-gray-700 text-gray-300 text-xs sm:text-sm rounded-full px-3 py-1 hover:bg-blue-600 hover:text-white transition duration-300 flex items-center shadow-md"
                    >
                      <FaTag className="mr-1 text-xs" />
                      <span className="truncate max-w-[150px]">{tag}</span>
                    </button>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
          <motion.div
            key={currentTagIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="sm:hidden"
          >
            <button
              onClick={() => setInput(promptTags[currentTagIndex])}
              className="bg-gray-700 text-gray-300 text-xs sm:text-sm rounded-full px-3 py-1 hover:bg-blue-600 hover:text-white transition duration-300 flex items-center shadow-md"
            >
              <FaTag className="mr-1 text-xs" />
              <span className="truncate max-w-[300px]">
                {promptTags[currentTagIndex]}
              </span>
            </button>
          </motion.div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
          <div className="flex-grow mb-2 sm:mb-0 sm:mr-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 text-sm sm:text-base rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask about agriculture..."
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg p-2 sm:p-3 hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            <FaPaperPlane className="text-sm sm:text-base" />
            <span className="ml-2 hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    );
};

export default AgriChatbot;