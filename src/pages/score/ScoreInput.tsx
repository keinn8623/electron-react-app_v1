import { Button } from "@/components/ui/button"
import { useRef, ChangeEvent, useEffect } from "react"

interface ElectronAPI {
    saveFile: (fileName: string, buffer: Uint8Array) => Promise<{filePath: string}>
}
declare global {
    interface Window {
        electronAPI: ElectronAPI
    }
}

const ScoreInput = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        console.log("window.electronAPI:", window.electronAPI)
        console.log("window obj keys:", Object.keys(window))
    })

    const handleUpload = () => {
        fileInputRef.current?.click()
    }
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            // Process the file here
            console.log("Selected file:", file)
            try {
                if (!window.electronAPI) {
                    throw new Error("electronAPI not found")
                }
                const arrayBuffer = await file.arrayBuffer()
                const buffer = new Uint8Array(arrayBuffer)

                const result = await window.electronAPI.saveFile(file.name, buffer)

                console.log("file saved:", result)
                alert(`file saved in ${result.filePath}`)
            } catch (error) {
             
                console.error("Error saving file:", error)
                alert("Error saving file. Please try again.")
            }
            event.target.value = ""
        }
    }



    return (
        <div className="flex flex-wrap items-center justify-center gap-2 md:flex-row">
            <Button variant="outline">download template</Button>
            <Button variant="outline" onClick={handleUpload}>upload</Button>
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv"
            />
        </div>
    )
}

export default ScoreInput