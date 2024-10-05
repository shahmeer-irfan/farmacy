"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Camera, Image as ImageIcon, Send, X } from "lucide-react"


export default function AIChatbot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [image, setImage] = useState(null)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const scrollAreaRef = useRef(null)

  const handleSend = useCallback(() => {
    if (input.trim() || image) {
      const newMessage = {
        id: Date.now().toString(),
        type: "user",
        content: input.trim(),
        image: image || undefined,
      }
      setMessages((prevMessages) => [...prevMessages, newMessage])
      setInput("")
      setImage(null)
      // Here you would typically send the message to your AI backend
      // and then add the AI's response to the messages
    }
  }, [input, image])

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result)
      reader.readAsDataURL(file)
    }
  }, [])

  const handleCameraCapture = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }, [])

  const captureImage = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0)
      setImage(canvas.toDataURL("image/jpeg"))
      if (videoRef.current.srcObject instanceof MediaStream) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      }
      videoRef.current.srcObject = null
    }
  }, [])

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [])

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">AI Chatbot</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div className={`flex ${message.type === "user" ? "flex-row-reverse" : "flex-row"} items-start max-w-[80%]`}>
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{message.type === "user" ? "U" : "AI"}</AvatarFallback>
                </Avatar>
                <div
                  className={`mx-2 p-3 rounded-2xl ${
                    message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.image && (
                    <img src={message.image} alt="Uploaded content" className="max-w-full mb-2 rounded-xl" />
                  )}
                  <p className="break-words">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <div className="flex w-full mb-4 items-end">
          <div className="flex space-x-2 mr-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="h-4 w-4" />
              <span className="sr-only">Upload image</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={handleCameraCapture}>
              <Camera className="h-4 w-4" />
              <span className="sr-only">Capture from camera</span>
            </Button>
          </div>
          <div className="flex-grow flex items-end">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Type your message here..."
              className="flex-grow mr-2 rounded-2xl resize-none"
              rows={1}
            />
            <Button onClick={handleSend} className="rounded-full h-10 w-10 p-2">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        {image && (
          <div className="relative w-full mt-2">
            <img src={image} alt="Preview" className="max-h-40 rounded-xl mx-auto" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-0 right-0 m-1 rounded-full"
              onClick={() => setImage(null)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
        )}
        <video ref={videoRef} className="hidden" />
        {videoRef.current?.srcObject && (
          <div className="mt-4">
            <Button onClick={captureImage} className="rounded-full">Capture</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}