'use client'
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

//create a handle to save the file
export function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      const filePreview = await parseCSV(file)
      setPreview(filePreview)
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">CSV File Upload</Label>
      <Input id="picture" type="file" accept=".csv" onChange={handleFileChange} />
      {preview && (
        preview
      )}
    </div>
  )
}

//create a function that can take the csv file and convert it to a string, dont make this a promise
export function parseCSV(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target) {
        resolve(e.target.result as string)
      }
    }
    reader.onerror = (e) => {
      reject(e)
    }
    reader.readAsText(file)
  })
} 
