'use client'
import { useState } from "react";
import { Upload, Image as ImageIcon, Video, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WeedDetector
() {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type.startsWith("image") ? "image" : "video");
      setResult(null); // Reset result when new file is uploaded
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    // Simulating API call for weed detection
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setResult("Weed detected in the bottom-left quadrant of your field.");
  };

  return (
    <div className="flex flex-col items-center mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Farm Weed Detective
      </h1>
      <p className="text-center mb-8">
        Upload a picture or video of your field, and we'll help you spot the
        weeds!
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle>Upload Field Image or Video</CardTitle>
            <CardDescription>
              Choose a clear, well-lit image or video of your field
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="field-media">Field Image or Video</Label>
                <Input
                  id="field-media"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </div>
              <Button className="mt-4" type="submit" disabled={!file}>
                Detect Weeds
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mx-auto">
          <CardHeader>
            <CardTitle>Preview and Results</CardTitle>
            <CardDescription>
              Your uploaded media and weed detection results will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {file && (
              <div className="mb-4">
                {fileType === "image" ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Field preview"
                    className="max-w-full h-auto"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(file)}
                    controls
                    className="max-w-full h-auto"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
            {result && (
              <div className="p-4 bg-green-100 text-green-800 rounded-md">
                <h3 className="font-semibold mb-2">Detection Results:</h3>
                <p>{result}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 mx-auto">
        <CardHeader>
          <CardTitle>Tips for Best Results</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Ensure your image or video is clear and well-lit</li>
            <li>Try to capture a good overview of your field</li>
            <li>If using video, pan slowly across the area of concern</li>
            <li>
              For best results, take photos or videos during daylight hours
            </li>
            <li>Make sure the file size is under 50MB for faster processing</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
