"use client";

import BulkTable from "@/app/blogs/bulkupload/BulkTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ExcelJS from "exceljs";
import { sheet_to_json } from "@/lib/utils";
import { BulkType, POST } from "@/app/constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PRISMA_POST_TYPE } from "@/app/constants";

export type Bulk = {
  [key: string]: string;
};

export interface BulkProps {
  tableData: Bulk[];
}

export default function BulkReader({ type = POST }: { type?: BulkType }) {
  const [parsedData, setParsedData] = useState<Bulk[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState<string>(
    PRISMA_POST_TYPE.DailyTips
  );
  const { toast } = useToast();
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const workbookInstance = new ExcelJS.Workbook();
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        const data = reader.result;

        const workbook = await workbookInstance.xlsx.load(data as ArrayBuffer);
        const sheet = workbook.getWorksheet("Sheet1");
        const parsedData = sheet_to_json(sheet, type);
        setParsedData(parsedData);
      };
    }
  };

  const handleVerifyData = async () => {
    try {
      setIsloading(true);
      const { status } = await fetch(
        `/api/bulk${type === POST ? "post" : "Contact"}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ data: parsedData, type: selectedPostType }),
        }
      );
      status === 201 &&
        toast({
          title: "Greetings",
          description: "Records Created Successfully",
        });
      setParsedData([]);
      setSelectedPostType(PRISMA_POST_TYPE.DailyTips);
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
      <div className="flex flex-col space-y-4">
        <Label>Post Type</Label>
        <RadioGroup
          defaultValue={selectedPostType}
          className="flex gap-4"
          onValueChange={(changedValue: string) =>
            setSelectedPostType(changedValue)
          }
        >
          {Object.keys(PRISMA_POST_TYPE).map((type) => (
            <div className="flex items-center space-x-2 " key={type}>
              <RadioGroupItem value={type} id={type} />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
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
