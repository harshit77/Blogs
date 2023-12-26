"use client";

import BulkTable from "@/app/blogs/bulkupload/BulkTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ExcelJS from "exceljs";
import { sheet_to_json } from "@/lib/utils";

export type Bulk = {
  [key: string]: string;
};

export interface BulkProps {
  tableData: Bulk[];
}

export default function BulkReader() {
  const [parsedData, setParsedData] = useState<Bulk[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const { toast } = useToast();
  const jsonSheet = [];
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const workbookInstance = new ExcelJS.Workbook();
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsArrayBuffer(file);
      reader.onload = async (event) => {
        const data = reader.result;

        const workbook = await workbookInstance.xlsx.load(data);
        const sheet = workbook.getWorksheet("Sheet1");
        const parsedData = sheet_to_json(sheet);
        setParsedData(parsedData);
      };
    }
  };

  const handleVerifyData = async () => {
    try {
      const payload = parsedData.map(({ title, content }: Bulk) => ({
        title,
        content,
      }));

      setIsloading(true);
      const { status } = await fetch("/api/bulkpost", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ data: payload }),
      });
      status === 201 &&
        toast({
          title: "Greetings",
          description: "Records Created Successfully",
        });
      setParsedData([]);
    } catch (error) {
      toast({
        title: "Something went wrong",
      });
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="blog">Bulk Upload</Label>
        <Input
          id="blog"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />
      </div>
      {!!parsedData.length && (
        <div className="flex flex-col space-y-8">
          <div className="flex justify-end">
            <Button
              variant="secondary"
              disabled={isLoading}
              onClick={handleVerifyData}
            >
              {isLoading ? "Verifying" : "Verify below data"}
            </Button>
          </div>
          <BulkTable tableData={parsedData} />
        </div>
      )}
    </div>
  );
}
